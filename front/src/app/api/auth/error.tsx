'use client'

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#ffb4c1]">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">認証エラー</h2>
        <p className="text-gray-600 mb-4">
          {error?.message || 'ログインに失敗しました。もう一度お試しください。'}
        </p>
        <button
          onClick={() => reset()}
          className="w-full bg-[#ffb4c1] text-white py-2 rounded hover:bg-[#fbc2c9]"
        >
          もう一度試す
        </button>
      </div>
    </div>
  )
}
