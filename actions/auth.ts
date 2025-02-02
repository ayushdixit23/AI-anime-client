"use server";

import { FormValues } from "@/app/(auth)/_components/login-form";
import { REDIRECT_PATH } from "@/app/utils/constants";
import { signIn } from "@/auth";

export const onSubmit = async (data: FormValues) => {
    try {
        console.log("credentials");
        await signIn("credentials", { ...data, redirect: true, redirectTo: REDIRECT_PATH });
    } catch (error) {
        throw error
    }
};

export const loginWithGoogle = async () => {
    try {
        console.log("google");
        await signIn("google", { callbackUrl: REDIRECT_PATH });
    } catch (error) {
        throw error
    }
};

