import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            const res = await axios.post('http://localhost:8000/api/login', {
                email: credentials?.email,
                password: credentials?.password,
            });
            console.log(res.data);
            if (res.data && res.data.token) {
              return {
                id: res.data.id,
                token: res.data.token,
                name: res.data.name,
                email: res.data.email,
              };
            }
            return null;
          } catch (error) {
            console.error('Authorization error:', error);
            return null;
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    secret: 'Hizurun',
    pages: {
        signIn: '/signin',  // サインインページ（任意で設定）
        error: '/error',    // エラーページ
        newUser: '/',            // 初回ログイン時のリダイレクト先
      },
  });



export const POST = handler;
