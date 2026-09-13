import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = { title: "Личный кабинет" };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const progress = await prisma.progress.findMany({
    where: { userId: user.id },
    orderBy: { completedAt: "asc" },
  });

  return (
    <AccountClient
      user={{ ...user, createdAt: user.createdAt.toISOString() }}
      progress={progress.map((p) => ({ ...p, completedAt: p.completedAt.toISOString() }))}
    />
  );
}
