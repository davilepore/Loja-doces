import { prisma } from "@/prisma/seed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteEventoButton from "./DeleteEventoButton";

export default async function EventosPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const eventos = await prisma.evento.findMany({
    include: { itens: true },
    orderBy: { dataInicio: "desc" },
  });

  return (
    <div className="p-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1118] tracking-tight">
            🎉 Eventos
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {eventos.length} evento(s) cadastrado(s)
          </p>
        </div>
        <Link
          href="/admin/eventos/novo"
          className="bg-[#1a1118] text-[#f9c5d1] px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-80 transition"
        >
          + Novo evento
        </Link>
      </div>

      {eventos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#f0ece8] p-16 text-center">
          <p className="text-5xl mb-3">🎉</p>
          <p className="text-gray-300 text-base">
            Nenhum evento cadastrado ainda.
          </p>
          <Link
            href="/admin/eventos/novo"
            className="text-pink-400 text-sm mt-2 inline-block"
          >
            Criar primeiro evento →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {eventos.map((ev) => {
            const inicio = new Date(ev.dataInicio).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });
            const fim = ev.dataFim
              ? new Date(ev.dataFim).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : null;

            return (
              <div
                key={ev.id}
                className="bg-white rounded-2xl border border-[#f0ece8] p-6 flex gap-5"
              >
                {ev.imagemUrl ? (
                  <img
                    src={ev.imagemUrl}
                    alt={ev.titulo}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-pink-50 flex items-center justify-center text-3xl flex-shrink-0">
                    🎉
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-base font-semibold text-[#1a1118]">
                      {ev.titulo}
                    </h2>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${ev.ativo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}
                    >
                      {ev.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-2 truncate">
                    {ev.descricao || "Sem descrição"}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>
                      📅 {inicio}
                      {fim ? ` → ${fim}` : ""}
                    </span>
                    <span>📦 {ev.itens.length} item(ns)</span>
                  </div>

                  {ev.itens.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {ev.itens.map((item) => (
                        <span
                          key={item.id}
                          className="text-xs bg-[#fdf2f4] text-pink-600 px-2.5 py-1 rounded-full"
                        >
                          {item.nome}
                          {item.preco
                            ? ` — R$ ${item.preco.toFixed(2).replace(".", ",")}`
                            : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/eventos/${ev.id}`}
                    className="px-4 py-2 rounded-lg bg-[#faf7f5] text-gray-600 text-sm font-medium hover:bg-gray-100 transition text-center"
                  >
                    ✏️ Editar
                  </Link>
                  <DeleteEventoButton id={ev.id} titulo={ev.titulo} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
