import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// ユーザーデータの型を定義
type UserData = {
  name: string;
  email: string;
};

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null); // 型を指定
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession(); // next-authのセッションを取得

  useEffect(() => {
    const fetchUserData = async () => {
      // tokenがない場合の処理
      const token = session?.user?.token as string; // 型アサーションでstringとして扱う

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`, // tokenを使ってAPIリクエスト
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data: UserData = await response.json(); // 型アノテーションを追加
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchUserData();
  }, [session]); // sessionが変更されるたびに再実行

  return (
    <div>
      <h1>User Dashboard</h1>
      {error && <p>Error: {error}</p>}
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}</h2> {/* name プロパティにアクセス可能 */}
          <p>Email: {userData.email}</p> {/* email プロパティにアクセス可能 */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
