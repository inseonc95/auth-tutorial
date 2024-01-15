'use client';

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "@/components/auth/card-wrapper";

import { RegisterSchema } from "@/schemas";
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

import { register } from "@/actions/register";
import { useTransition } from "react";

const RegisterForm = () => {

  const [error, SetError] = useState<string | undefined>("");
  const [success, SetSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // setPending 대신에 useTransition을 사용할 수 있음

    SetError("");
    SetSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          SetError(data.error);
          SetSuccess(data.success);
        })
    });

    // axios.post("/your/api/route", values).then...
  }

  return ( 
    <CardWrapper
    headerLabel="Create an account"
    backButtonLabel="Already have an account?"
    backButtonHref="/auth/login">
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      >
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  disabled={isPending}
                  placeholder="Jon Doe"
                  type="name"
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
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button 
        disabled={isPending}
        type="submit" 
        className="w-full" 
        >
          Create an account
        </Button>
      </form>
    </Form>
    </CardWrapper>
   );
}
 
export default RegisterForm;