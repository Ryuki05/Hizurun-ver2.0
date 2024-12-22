import NextAuth from 'next-auth';
import { authOptions } from '@/providers/NextAuth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
