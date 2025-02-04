'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  cart: CartItem[];
  setUser: (user: User | null) => void;
  setCart: (cart: CartItem[]) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        if (response.data.cart) {
          setCart(response.data.cart);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('認証チェックエラー:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setCart([]);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      setCart([]);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      cart,
      setUser,
      setCart,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
