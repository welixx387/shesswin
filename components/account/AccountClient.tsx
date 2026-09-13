"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Calendar, CheckCircle2, Circle, LogOut, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";
import { accentClasses } from "@/lib/accent";
import { useAuthStore } from "@/lib/auth-store";
import { openings } from "@/data/openings";

type AccountUser = { id: string; email: string; name: string; createdAt: string };
type ProgressRow = { id: string; openingSlug: string; xp: number; completedAt: string };

function getTier(xp: number) {
  if (xp >= 350) return { label: "Гроссмейстер", accent: "gold" as const };
  if (xp >= 250) return { label: "Эксперт", accent: "success" as const };
  if (xp >= 150) return { label: "Любитель", accent: "primary" as const };
  if (xp >= 50) return { label: "Ученик", accent: "primary" as const };
  return { label: "Новичок", accent: "gold" as const };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function AccountClient({ user, progress }: { user: AccountUser; progress: ProgressRow[] }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    useAuthStore.getState().setUser(user);
  }, [user]);

  const completedSlugs = useMemo(() => new Set(progress.map((p) => p.openingSlug)), [progress]);
  const totalXp = useMemo(() => progress.reduce((sum, p) => sum + p.xp, 0), [progress]);
  const tier = getTier(totalXp);
  const tierAccent = accentClasses[tier.accent];
  const completedCount = completedSlugs.size;
  const totalCount = openings.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      useAuthStore.getState().setUser(null);
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <Reveal>
        <GlassCard className="gradient-border-mask relative overflow-hidden p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)" }}
          />
          <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-brand font-heading text-2xl font-bold text-white shadow-glow-primary"
            >
              {initials || "S"}
            </motion.div>
            <div className="flex-1">
              <h1 className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">{user.name}</h1>
              <p className="mt-0.5 text-sm text-text-secondary">{user.email}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <span
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tierAccent.border} ${tierAccent.bg} ${tierAccent.text}`}
                >
                  <Trophy size={13} />
                  {tier.label}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <Calendar size={13} />
                  Участник с {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} disabled={loggingOut} icon={<LogOut size={16} />}>
              {loggingOut ? "Выходим…" : "Выйти"}
            </Button>
          </div>
        </GlassCard>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <Reveal delay={0.05}>
          <GlassCard className="flex flex-col items-center gap-1 p-6 text-center">
            <span className="flex items-center gap-1.5 font-heading text-3xl font-bold text-accent-gold">
              <Award size={22} />
              <CountUp value={totalXp} />
            </span>
            <span className="text-sm text-text-secondary">всего XP</span>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="flex flex-col items-center gap-1 p-6 text-center">
            <span className="font-heading text-3xl font-bold text-text-primary">
              <CountUp value={completedCount} />
              <span className="text-text-secondary">/{totalCount}</span>
            </span>
            <span className="text-sm text-text-secondary">дебютов изучено</span>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.15}>
          <GlassCard className="flex flex-col items-center gap-1 p-6 text-center">
            <span className="font-heading text-3xl font-bold text-accent-success">
              <CountUp value={percent} suffix="%" />
            </span>
            <span className="text-sm text-text-secondary">общий прогресс</span>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-6">
        <GlassCard className="p-6 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-bold text-text-primary">Прогресс по дебютам</h2>
            <span className="text-sm text-text-secondary">
              {completedCount} из {totalCount}
            </span>
          </div>

          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="shimmer-bg h-full rounded-full"
            />
          </div>

          <ul className="flex flex-col divide-y divide-border-subtle">
            {openings.map((opening) => {
              const accent = accentClasses[opening.accent];
              const done = completedSlugs.has(opening.slug);
              return (
                <li key={opening.slug}>
                  <Link
                    href={`/debuts/${opening.slug}`}
                    className="flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-white/[0.03] sm:rounded-xl sm:px-3"
                  >
                    <div className="flex items-center gap-3">
                      {done ? (
                        <CheckCircle2 size={20} className="shrink-0 text-accent-success" />
                      ) : (
                        <Circle size={20} className="shrink-0 text-text-secondary/40" />
                      )}
                      <div>
                        <p className="font-medium text-text-primary">{opening.name}</p>
                        <p className="text-xs text-text-secondary">{opening.tagline}</p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        done ? `${accent.border} ${accent.bg} ${accent.text}` : "border-border-subtle text-text-secondary/60"
                      }`}
                    >
                      {done ? "Изучено" : "Не начато"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </GlassCard>
      </Reveal>
    </div>
  );
}
