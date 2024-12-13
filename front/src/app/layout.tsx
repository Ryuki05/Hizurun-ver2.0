import { ReactNode } from 'react';
import NextAuthProvider from '@/providers/NextAuth';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
