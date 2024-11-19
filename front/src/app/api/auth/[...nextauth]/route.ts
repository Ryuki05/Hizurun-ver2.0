import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'UserName', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // バックエンドの認証APIを呼び出して、ユーザー情報を取得
          const res = await axios.post('http://localhost:8000/api/login', {
            name: credentials?.name,
            password: credentials?.password,
          });

          // レスポンスにトークンが含まれているかを確認
          if (res.data && res.data.token) {
            return {
              id: res.data.id,  // 必要に応じてユーザー情報を返す
              token: res.data.token,
              name: res.data.name,
              email: res.data.email,
            };
          }
          return null;
        } catch (error) {
          console.error('Authorization error:', error);  // エラー詳細をログに出力
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: 'YOUR_SECRET_KEY',
});

export { handler as GET, handler as POST };
