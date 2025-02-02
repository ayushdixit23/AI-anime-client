"use server";

import { FormValues } from "@/app/(auth)/_components/login-form";
import {
  DEFAULT_REDIRECT_PATH,
  DEFAULT_RESTRICTED_REDIRECT_PATH,
} from "@/app/utils/constants";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const credentialsLogin = async (data: FormValues) => {
  try {
    const result = await signIn("credentials", {
      ...data,
      redirect: false, // Don't redirect automatically
    });

    return result;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
        console.log(error.message,"tryiing mess")
      switch (error.type) {
        case "CredentialsSignin":
          return { error: error.message|| "Invalid credentials." }

        default:
          return { error: "Something went wrong." }
      }
    }
    throw error
  }
};


export const signGoogleServer = async () => {
  try {
    await signIn("google", { callbackUrl: DEFAULT_REDIRECT_PATH });
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  console.log("log out");
  await signOut({
    redirect: true,
    redirectTo: DEFAULT_RESTRICTED_REDIRECT_PATH,
  });
};
