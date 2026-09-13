import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Вход" };

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center px-4 py-32">
      <LoginForm />
    </div>
  );
}
