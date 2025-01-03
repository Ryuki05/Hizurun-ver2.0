<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * レビューを保存 (API)
     */
    public function store(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $review = new Review();
        $review->user_id = auth()->id();
        $review->product_id = $product->id;
        $review->rating = $validatedData['rating'];
        $review->comment = $validatedData['comment'];
        $review->save();

        return response()->json([
            'message' => 'レビューが投稿されました。',
            'review' => $review,
        ], 201); // 201 Created
    }
}
