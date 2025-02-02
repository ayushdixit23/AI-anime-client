import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { API } from "./app/utils/constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Custom Credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        try {
          const res = await axios.post(`${API}/auth/login`, {
            email,
            password,
          });
          console.log(res.data);

          if (res.data.token) {
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              fullName: res.data.user.fullName,
              userName: res.data.user.userName,
              image: res.data.user.profileImage,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  // Session settings to use JWT
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log(user, "jwt callback");
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.fullName;
        token.userName = user.userName;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      console.log(session, token, "session callback");
      // Add token info to session
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.fullName = token.fullName;
      session.user.userName = token.userName;
      session.user.image = token.image;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true, // Make sure cookie is HttpOnly
        sameSite: "lax", // Or 'strict' depending on your needs
        path: "/", // Ensure the path is set to root if you want it to be accessible across your app
      },
    },
  },

  secret: process.env.AUTH_SECRET,
});
