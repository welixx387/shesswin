import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Регистрация" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center px-4 py-32">
      <RegisterForm />
    </div>
  );
}
