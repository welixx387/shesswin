import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { email: rawEmail, password, name: rawName } = (body ?? {}) as Record<string, unknown>;
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const name = typeof rawName === "string" ? rawName.trim() : "";
  const pwd = typeof password === "string" ? password : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });
  }
  if (pwd.length < 8) {
    return NextResponse.json({ error: "Пароль должен быть не короче 8 символов" }, { status: 400 });
  }
  if (!name || name.length > 60) {
    return NextResponse.json({ error: "Введите имя (до 60 символов)" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Этот email уже зарегистрирован" }, { status: 409 });
  }

  const passwordHash = await hashPassword(pwd);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  const token = await createSessionToken(user.id);
  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
