import NextAuth from 'next-auth';
import { authOptions } from './auth-options'; // Import from auth-options.ts

export default NextAuth(authOptions);
