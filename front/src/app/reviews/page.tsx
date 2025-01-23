'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Review {
  id: number
  user_name: string
  rating: number
  comment: string
  created_at: string
}

const ReviewsPage = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/api/products/${productId}/reviews`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error('レビューの取得に失敗しました')
        }
        const data = await response.json()
        setReviews(data)
      } catch (error) {
        console.error('エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchReviews()
    }
  }, [productId])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">読み込み中...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">商品レビュー</h1>
        <Link
          href={`/products/${productId}`}
          className="bg-[#ffb4c1] text-white px-4 py-2 rounded hover:bg-[#fbc2c9]"
        >
          商品ページに戻る
        </Link>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">{review.user_name}</div>
              <div className="text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString('ja-JP')}
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewsPage
