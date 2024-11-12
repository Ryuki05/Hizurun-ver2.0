import { useEffect, useState } from 'react';

// ユーザーデータの型を定義
type UserData = {
  name: string;
  email: string;
};

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null); // 型を指定
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, []);

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
