"use server";

import { FormValues } from "@/app/(auth)/_components/login-form";
import { DEFAULT_REDIRECT_PATH, DEFAULT_RESTRICTED_REDIRECT_PATH } from "@/app/utils/constants";
import { signIn, signOut } from "@/auth";

export const onSubmit = async (data: FormValues) => {
    try {
        console.log("credentials");
        await signIn("credentials", { ...data, redirect: true, redirectTo: DEFAULT_REDIRECT_PATH });
    } catch (error) {
        throw error
    }
};

export const loginWithGoogle = async () => {
    try {
        console.log("google");
        await signIn("google", { callbackUrl: DEFAULT_REDIRECT_PATH });
    } catch (error) {
        throw error
    }
};


export const logOut = async () => {
    console.log("log out")
    await signOut({ redirect: true, redirectTo: DEFAULT_RESTRICTED_REDIRECT_PATH }); // Ensure you await the sign out function
}