'use client';
import { ReactNode } from 'react';
import NextAuthProvider from '@/providers/NextAuth';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
