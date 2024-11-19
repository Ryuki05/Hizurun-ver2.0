import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string; // 必須の id プロパティを追加
    token: string;
    name: string;
    email: string;
  }

  interface Session {
    user: {
      id: string;
      token: string;
      name: string;
      email: string;
    };
  }
}
