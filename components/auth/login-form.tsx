'use client';

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

import { login } from "@/actions/login";
import { useTransition } from "react";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider"
    : "";

  const [error, SetError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // setPending 대신에 useTransition을 사용할 수 있음

    SetError("");
    SetSuccess("");
    startTransition(() => {
      login(values)
        .then((data) => {
          SetError(data?.error);
          // TODO: Add when we add 2FA
          // SetSuccess(data?.success);
        })
    });

    // axios.post("/your/api/route", values).then...
  }

  return ( 
    <CardWrapper
    headerLabel="Welcome Back"
    backButtonLabel="Don't have an account?"
    backButtonHref="/auth/register"
    showSocial>
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      >
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={isPending}
                  placeholder="jon.doe@exmple.com"
                  type="email"
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
                  {...field}
                  disabled={isPending}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
        />
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button 
        disabled={isPending}
        type="submit" 
        className="w-full" 
        >
          Login
        </Button>
      </form>
    </Form>
    </CardWrapper>
   );
}
 
export default LoginForm;