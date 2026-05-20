import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const configs = await prisma.configuracao.findMany();

  const obj = Object.fromEntries(configs.map((c) => [c.chave, c.valor]));
  return NextResponse.json(obj);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json(); 

  
  await Promise.all(
    Object.entries(body).map(([chave, valor]) =>
      prisma.configuracao.upsert({
        where: { chave },
        update: { valor: valor as string },
        create: { chave, valor: valor as string },
      })
    )
  );

  return NextResponse.json({ ok: true });
}