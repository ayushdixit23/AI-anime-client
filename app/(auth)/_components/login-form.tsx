"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { credentialsLogin, signGoogleServer } from "@/actions/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { errorHandler } from "@/app/utils/helper";
import { DEFAULT_REDIRECT_PATH } from "@/app/utils/constants";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
      message: "Invalid email address format",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "ayushdixitdev@gmail.com",
      password: "ayushdixitdev"
    },
  });

  const loginWithGoogle = async () => {
    setGoogleLoading(true)
    try {
      await signGoogleServer();
      toast.success("Login Successfull!");
    } catch (error: unknown) {
      errorHandler(error)
    } finally {
      setGoogleLoading(false)
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const res = await credentialsLogin(data);

      if (res.error) {
        toast.error(res?.error.split(".")[0])
        return
      }

      toast.success("Login Successfull!");

      router.push(DEFAULT_REDIRECT_PATH)
    } catch (error) {
      // Handle different error scenarios
      console.log(error)

    } finally {
      setLoading(false);
    }
  };

  return (
    // bg-gradient-to-r from-[#1A1A2E]
    <div className="w-full bg-gradient-to-br from-[#0B0B0B] via-[#1A1A1A] to-[#2E2E2E] rounded-2xl">
      <motion.div
        className="w-full p-8  shadow-lg text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      className="w-full p-3 py-4 rounded-lg  text-white outline-none "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*******"
                      {...field}
                      className="w-full p-3 py-4 rounded-lg text-white outline-none "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold shadow-md"
              type="submit"
            >
              {loading ? "Loading..." : "Continue"}
            </motion.button>
          </form>
        </Form>
        <div className="relative text-center my-6 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <motion.button
          onClick={loginWithGoogle}
          disabled={googleLoading}
          whileHover={{ scale: 1.05 }}
          className="w-full flex items-center justify-center bg-blue-600 py-3 rounded-xl font-semibold shadow-md"
        >
          {googleLoading ? <FaSpinner className="animate-spin text-white mr-2" size={20} /> : <> <FcGoogle className="mr-2" /> Login with Google</>}

        </motion.button>
        <p className="text-sm font-light mt-6 text-white text-center">
          Don’t have an account yet?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
