"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Logo } from "@/components/ui/Logo";
import { useAuthStore } from "@/lib/auth-store";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Не удалось войти");
        return;
      }
      useAuthStore.getState().setUser(data.user);
      router.push("/account");
      router.refresh();
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md"
    >
      <GlassCard className="gradient-border-mask p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo animate={false} showWordmark={false} size={40} className="mb-4" />
          <h1 className="font-heading text-2xl font-bold text-text-primary">С возвращением</h1>
          <p className="mt-1 text-sm text-text-secondary">Войдите, чтобы продолжить обучение</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
              {error}
            </motion.p>
          )}

          <Button type="submit" size="lg" className="mt-2 w-full" disabled={loading}>
            {loading ? "Входим…" : "Войти"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-accent-glow hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </GlassCard>
    </motion.div>
  );
}
