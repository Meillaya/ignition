import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { auth } from "@/server/auth";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async () => {
    const session = await auth();
    return session;
  }),

  signInWithEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      // TODO: Implement email sign-in logic
      return { success: true };
    }),

  signUpWithEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      // TODO: Implement email sign-up logic
      return { success: true };
    }),
});