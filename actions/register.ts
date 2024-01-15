"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validate the values

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" }; // return Rseponse.Json ~~
  }
  return { success: "Email Sent!" };
}