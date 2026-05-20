// /app/api/admin/doces/[id]/route.ts
import { prisma } from "@/prisma/seed";
import {NextResponse} from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10); 

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const body = await request.json();
  const atualizado = await prisma.doce.update({
    where: { id },
    data: body,
  });
  return NextResponse.json(atualizado);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10); 

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  await prisma.doce.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}