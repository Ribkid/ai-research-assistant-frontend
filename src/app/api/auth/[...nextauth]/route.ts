import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// In-memory user store for demonstration
const users = [
  { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (user) {
          // Return user object without the password
          return { id: user.id, name: user.name, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
