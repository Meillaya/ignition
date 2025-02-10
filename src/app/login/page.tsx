import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { AuthLayout } from "@/app/_components/AuthLayout";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to your account to continue"
    >
      <div className="social-buttons-container">
        <Button
          variant="outline"
          className="social-login-btn google-btn"
          onClick={() => signIn("google", { redirect: false })}
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={24}
            height={24}
          />
        </Button>
        <Button
          variant="outline"
          className="social-login-btn apple-btn"
          onClick={() => signIn("apple", { redirect: false })}
        >
          <Image
            src="/apple.svg"
            alt="Apple"
            width={24}
            height={24}
          />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-primary underline hover:no-underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
