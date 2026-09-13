"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "О проекте", href: "/#why" },
  { label: "Курсы", href: "/debuts" },
  { label: "Блог", href: null },
  { label: "Контакты", href: null },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="relative mt-20 border-t border-border-subtle">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-60"
        style={{ boxShadow: "0 0 24px 2px rgba(99,102,241,0.5)" }}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="flex flex-col gap-4">
          <Logo animate={false} />
          <p className="max-w-xs text-sm leading-relaxed text-text-secondary">
            Освой шахматные дебюты — как гроссмейстер. Каждый ход — шаг к победе.
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary/70">
            Навигация
          </span>
          {FOOTER_LINKS.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                className="w-fit text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ) : (
              <span key={link.label} className="w-fit text-sm text-text-secondary/40">
                {link.label}
              </span>
            )
          )}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary/70">
            Рассылка
          </span>
          <p className="text-sm text-text-secondary">Новые дебюты и разборы партий — раз в две недели.</p>
          <form onSubmit={handleSubmit} className="relative mt-1 flex max-w-sm gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="peer w-full rounded-full border border-border-subtle bg-white/[0.03] px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors focus:border-accent-primary"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              OK
            </button>
          </form>
          <motion.div
            initial={false}
            animate={{ height: submitted ? "auto" : 0, opacity: submitted ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 pt-2 text-sm text-accent-success">
              <motion.svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: submitted ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.svg>
              Спасибо! Вы в списке.
            </div>
          </motion.div>
        </div>
      </div>

      <div className={cn("border-t border-border-subtle px-4 py-6 text-center text-xs text-text-secondary/60 sm:px-6 lg:px-8")}>
        © {new Date().getFullYear()} ShessWin. Играй смело. Играй точно. Побеждай.
      </div>
    </footer>
  );
}
