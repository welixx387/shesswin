import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth/session";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const { email: rawEmail, password } = (body ?? {}) as Record<string, unknown>;
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const pwd = typeof password === "string" ? password : "";

  const genericError = () => NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });

  if (!email || !pwd) return genericError();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return genericError();

  const valid = await verifyPassword(pwd, user.passwordHash);
  if (!valid) return genericError();

  const token = await createSessionToken(user.id);
  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
  });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
