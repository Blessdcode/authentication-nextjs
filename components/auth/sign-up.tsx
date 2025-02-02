"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { SignUpSchema } from "@/schema";
import { signup } from "@/actions/sign-up";
import { FormError } from "../custom/form-error";
import { FormSuccess } from "../custom/form-success";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type IFormSubmit = {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: IFormSubmit) => {
    setError("");
    setSuccess("");
    const response = await signup(values);
    if (response.error) {
      setError(response.error);
    } else {
      setSuccess(response.success);
      form.reset();
    }
    router.push("/auth/login");
    console.log(response, "user data");
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
      router.push("/dashboard")
    } catch (error) {
      setError("Google Sign-in failed");
      console.log(error, "google sign-up error");
    }
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      buttonLabel="Have an account already"
      buttonLabelLink="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5 my-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="John Deo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UseName</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="Deo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ConfirmPassword</FormLabel>
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
            Sign Up
          </Button>
        </form>
        <Button
          onClick={handleGoogleSignIn}
          className="my-4 w-full bg-lightBlue hover:bg-darkBlue">
          Continue with Google{" "}
        </Button>
      </Form>
    </CardWrapper>
  );
};

export default SignUp;
