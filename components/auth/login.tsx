"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { SignUpSchema } from "@/schema/signUpSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { CardWrapper } from "./cardWrapper";
import { LoginSchema } from "@/schema";
import { login } from "@/actions/login";
// import { signIn } from "@/auth";
import { FormError } from "../custom/form-error";
import { signIn } from "next-auth/react";
import { FormSuccess } from "../custom/form-success";

const Login = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setError("");
    setSuccess("")
    const response = await login(data);

    if (response.error) {
      setError(response.error);
    } else {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/auth/verify-email",
      });
      setSuccess(response.success);
    }
    console.log("data", response)
  };

  return (
    <CardWrapper
      headerLabel="Login to your account"
      buttonLabel="Don't have an account"
      buttonLabelLink="/auth/sign-up">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5 my-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="johndeo@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full  hover:bg-lightBlue">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default Login;
