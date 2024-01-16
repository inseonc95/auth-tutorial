'use server';

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";


export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist" };
  }
  
  const hasExpired = new Date(existingToken.expires) < new Date();
 
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email, // 사용자가 이메일을 바꿀 수 있으므로 처리하는것임
     },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
}