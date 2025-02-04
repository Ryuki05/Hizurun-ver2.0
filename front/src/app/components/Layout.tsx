'use client';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, cart } = useAuth();

  return (
    <div>
      {/* ヘッダーなどでユーザー情報やカート情報を表示 */}
      {isAuthenticated && user && (
        <div>
          ようこそ、{user.name}さん
          カート内アイテム: {cart.length}個
        </div>
      )}
      {children}
    </div>
  );
}
