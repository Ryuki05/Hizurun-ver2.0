<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * レビューを保存 (API) - ログインなしで可能
     */
    public function store(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review = new Review();
        $review->user_id = $request->user() ? $request->user()->id : null; // ログインしていない場合は null
        $review->product_id = $product->id;
        $review->rating = $validatedData['rating'];
        $review->comment = $validatedData['comment'];
        $review->save();

        return response()->json([
            'status' => 'success',
            'message' => 'レビューが投稿されました',
            'review' => $review->load('user'),
        ], 201);
    }
}
