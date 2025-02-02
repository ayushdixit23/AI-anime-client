import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
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
          const res = await axios.post(`${API}/auth/login`, { email, password });
    
          if (res.data.token) {
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              fullName: res.data.user.fullName,
              userName: res.data.user.userName,
              image: res.data.user.profileImage,
            };
          } else {
            // Return the error message if login fails (incorrect credentials)
            return { error: res.data.message || "Invalid credentials" };
          }
        } catch (error) {
          if (error.response) {
            // Handle error from backend (e.g., 401)
            throw new CredentialsSignin(error.response.data.message || "Something went wrong.")
            // return { error: error.response.data.message || "Something went wrong" };
          } else if (error.request) {
            // No response from server
            throw new CredentialsSignin("Server not responding. Please try again later.")
            // return { error: "Server not responding. Please try again later." };
          } else {
            // Other errors
            throw new CredentialsSignin("An error occurred during login. Please try again.")
            // return { error: "An error occurred during login. Please try again." };
          }
        }
      },
    
    }),
  ],

  // Session settings to use JWT
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // SignIn Callback
    async signIn({ account, user }) {
      console.log("user", user)

      if (account?.provider === "google") {

        try {
          const res = await axios.post(`${API}/auth/google`, {
            email: user.email,
            fullName: user.name, image: user.image
          });

          if (res.data && res.data.user) {
            user.id = res.data.user.id;
            // @ts-ignore
            user.fullName = res.data.user.fullName;
            // @ts-ignore
            user.userName = res.data.user.userName;
            user.image = res.data.user.profileImage;
          }
        } catch (error) {
          console.error("Error fetching/updating user data from Google login:", error);
          return false; // Prevent sign-in if the API call fails
        }
      }
      return true;
    },
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.email = user.email;
        // @ts-ignore
        token.fullName = user.fullName;
        // @ts-ignore
        token.userName = user.userName;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {

      // Add token info to session
      // @ts-ignore
      session.user.id = token.id;
      // @ts-ignore
      session.user.email = token.email;
      // @ts-ignore
      session.user.fullName = token.fullName;
      // @ts-ignore
      session.user.userName = token.userName;
      // @ts-ignore
      session.user.image = token.image;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  // cookies: {
  //   sessionToken: {
  //     name: "authjs.session-token",
  //     options: {
  //       httpOnly: true, // Make sure cookie is HttpOnly
  //       sameSite: "lax", // Or 'strict' depending on your needs
  //       path: "/", // Ensure the path is set to root if you want it to be accessible across your app
  //     },
  //   },
  // },

  secret: process.env.AUTH_SECRET,
});
