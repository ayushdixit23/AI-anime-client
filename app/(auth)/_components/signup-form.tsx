"use client";
import { useForm } from "react-hook-form";
import { API } from "@/app/utils/constants";
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
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdLinkedCamera } from "react-icons/md";
import axios from "axios";
import { onSubmit } from "@/actions/auth";

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.type.startsWith("image/"), {
      message: "Please upload a valid image.",
    })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: "Image size should be less than 5MB.",
    })
    .refine((file) => Boolean(file), {
      message: "Image is required.",
    }),
  fullname: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
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

type FormValues = z.infer<typeof formSchema>;

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      image: null,
      email: "",
      password: "",
    },
  });

  async function createAccount(data: FormValues) {
    setLoading(true);
    const formData = new FormData();
    formData.append("fullName", data.fullname);
    formData.append("userName", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.image instanceof File) {
      formData.append("profileImage", data.image);
    }

    try {
      const response = await axios.post(`${API}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.data.success) {
        await onSubmit({
          email: data.email,
          password: data.password,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    console.log(data);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      form.clearErrors("image");
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#0B0B0B] via-[#1A1A1A] to-[#2E2E2E] rounded-2xl">
      <motion.div
        className="w-full p-8  shadow-lg text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createAccount)}
            className="flex flex-col gap-4"
          >
            {/* Image upload field */}
            <div className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full border flex items-center justify-center"
                onClick={() => document.getElementById("imageInput")?.click()} // Trigger file input on div click
              >
                {form.watch("image") ? (
                  <img
                    src={URL.createObjectURL(form.watch("image"))}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <MdLinkedCamera className="text-xl text-gray-500" />
                )}
              </div>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {form.formState.errors.image && (
              <p className="text-red-500 text-center text-xs">
                {form.formState.errors.image?.message?.toString()}
              </p>
            )}

            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
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
              className="w-full bg-white text-black py-3 rounded-xl font-semibold shadow-md"
              disabled={loading}
              type="submit"
            >
              {loading ? "Creating..." : "Create Account"}
            </motion.button>
          </form>
        </Form>

        <p className="text-sm font-light mt-6 text-white text-center">
          Already have an account ?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
