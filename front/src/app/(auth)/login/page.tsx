"use client";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import apiAxios from "@/services/api";
import axios from "axios";
import { useAuth } from "@/context/authContext";

const formSchema = z.object({
  identifiant: z.string().min(1, { message: "This field has to be filled." }),
  password: z.string(),
});

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifiant: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await apiAxios.post("/auth/login", {
        identifiant: values.identifiant,
        password: values.password,
      });

      if (response.status === 200) {
        login(response.data.user);
        // Add a small delay to ensure cookie is set
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Login failed";
        console.log(errorMessage);
        // toast.error(errorMessage);
      } else {
        // toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="flex w-full h-screen">
      <div className="relative w-1/3 h-full flex flex-col bg-sky-200 justify-center items-center space-y-6">
        <h1 className="absolute top-8 left-8 text-6xl text-b border-4 border-double">
          Pulse
        </h1>
        <h1 className="">Don&apos;t have an account ?</h1>
        <Button onClick={() => router.push("/register")}>Sign up</Button>
      </div>
      <div className="w-2/3 flex bg-amber-50 justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-2/3"
          >
            <FormField
              control={form.control}
              name="identifiant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@email.com"
                      {...field}
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
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-2 bg-sky-200 text-gray-700 hover:bg-sky-300"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
