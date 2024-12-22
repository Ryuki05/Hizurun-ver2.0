'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
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
        signIn: '/sign-up',
        error: '/sign-up',
        newUser: '/',
    },
};

const NextAuthProvider = ({ children }: { children: ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthProvider
