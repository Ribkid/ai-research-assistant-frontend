import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Get user from database
          const result = await pool.query(
            'SELECT id, email, name, password_hash FROM users WHERE email = $1',
            [credentials.email]
          );

          if (result.rows.length === 0) {
            console.log('User not found');
            return null;
          }

          const user = result.rows[0];

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password_hash);
          
          if (!isValid) {
            console.log('Invalid password');
            return null;
          }

          // Return user object for session
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };