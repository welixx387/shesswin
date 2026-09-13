import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/get-session";
import { openings } from "@/data/openings";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const progress = await prisma.progress.findMany({ where: { userId: user.id } });
  return NextResponse.json({ progress });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { openingSlug } = (body ?? {}) as Record<string, unknown>;
  const slug = typeof openingSlug === "string" ? openingSlug : "";
  const isValidSlug = openings.some((o) => o.slug === slug);
  if (!isValidSlug) {
    return NextResponse.json({ error: "Неизвестный дебют" }, { status: 400 });
  }

  const entry = await prisma.progress.upsert({
    where: { userId_openingSlug: { userId: user.id, openingSlug: slug } },
    update: {},
    create: { userId: user.id, openingSlug: slug, xp: 50 },
  });

  return NextResponse.json({ progress: entry });
}
