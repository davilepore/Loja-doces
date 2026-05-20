import { prisma } from "@/prisma/seed";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.itemCarrinho.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { quantidade } = await req.json();

  if (quantidade <= 0) {
    await prisma.itemCarrinho.delete({ where: { id: Number(id) } });
  } else {
    await prisma.itemCarrinho.update({
      where: { id: Number(id) },
      data: { quantidade },
    });
  }

  return NextResponse.json({ ok: true });
}

