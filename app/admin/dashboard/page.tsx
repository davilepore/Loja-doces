// app/admin/dashboard/page.tsx
import { prisma } from "@/prisma/seed";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }
  const [totalDoces, docesDisponiveis, totalEventos, eventosAtivos] =
    await Promise.all([
      prisma.doce.count(),
      prisma.doce.count({ where: { disponivel: true } }),
      prisma.evento.count(),
      prisma.evento.count({ where: { ativo: true } }),
    ]);

  const ultimosDoces = await prisma.doce.findMany({
    orderBy: { criadoEm: "desc" },
    take: 5,
  });

  const proximosEventos = await prisma.evento.findMany({
    where: { ativo: true, dataInicio: { gte: new Date() } },
    orderBy: { dataInicio: "asc" },
    take: 3,
  });

  const stats = [
    {
      label: "Total de Doces",
      value: totalDoces,
      icon: "🍬",
      color: "#f9c5d1",
    },
    {
      label: "Doces Disponíveis",
      value: docesDisponiveis,
      icon: "✅",
      color: "#b8f0d0",
    },
    {
      label: "Total de Eventos",
      value: totalEventos,
      icon: "🎉",
      color: "#fde68a",
    },
    {
      label: "Eventos Ativos",
      value: eventosAtivos,
      icon: "🔥",
      color: "#fca5a5",
    },
  ];

  return (
    <div style={{ padding: "40px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1a1118",
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          Bom dia! 👋
        </h1>
        <p style={{ color: "#888", fontSize: 15, margin: 0 }}>
          Aqui está um resumo da sua loja.
        </p>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "24px",
              border: "1px solid #f0ece8",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1a1118",
                letterSpacing: "-1px",
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "#999" }}>{s.label}</div>
            <div
              style={{
                height: 3,
                background: s.color,
                borderRadius: 99,
                marginTop: 16,
                opacity: 0.7,
              }}
            />
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Últimos doces */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #f0ece8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #f5f0ec",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#1a1118",
                margin: 0,
              }}
            >
              Últimos doces cadastrados
            </h2>
            <Link
              href="/admin/doces"
              style={{ fontSize: 13, color: "#c084a8", textDecoration: "none" }}
            >
              Ver todos →
            </Link>
          </div>
          <div>
            {ultimosDoces.length === 0 ? (
              <div
                style={{
                  padding: "32px 24px",
                  textAlign: "center",
                  color: "#bbb",
                  fontSize: 14,
                }}
              >
                Nenhum doce cadastrado ainda.
              </div>
            ) : (
              ultimosDoces.map((doce, i) => (
                <div
                  key={doce.id}
                  style={{
                    padding: "14px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom:
                      i < ultimosDoces.length - 1
                        ? "1px solid #faf7f5"
                        : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#1a1118",
                      }}
                    >
                      {doce.nome}
                    </div>
                    <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>
                      {doce.categoria || "Sem categoria"}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1a1118",
                      }}
                    >
                      R$ {doce.preco.toFixed(2).replace(".", ",")}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        padding: "3px 8px",
                        borderRadius: 99,
                        background: doce.disponivel ? "#d1fae5" : "#fee2e2",
                        color: doce.disponivel ? "#065f46" : "#991b1b",
                      }}
                    >
                      {doce.disponivel ? "Disponível" : "Indisponível"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Próximos eventos */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #f0ece8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #f5f0ec",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#1a1118",
                margin: 0,
              }}
            >
              Próximos eventos
            </h2>
            <a
              href="/admin/eventos"
              style={{ fontSize: 13, color: "#c084a8", textDecoration: "none" }}
            >
              Ver todos →
            </a>
          </div>
          <div>
            {proximosEventos.length === 0 ? (
              <div
                style={{
                  padding: "32px 24px",
                  textAlign: "center",
                  color: "#bbb",
                  fontSize: 14,
                }}
              >
                Nenhum evento próximo.
              </div>
            ) : (
              proximosEventos.map((ev, i) => (
                <div
                  key={ev.id}
                  style={{
                    padding: "16px 24px",
                    borderBottom:
                      i < proximosEventos.length - 1
                        ? "1px solid #faf7f5"
                        : "none",
                  }}
                >
                  <div
                    style={{ fontSize: 14, fontWeight: 500, color: "#1a1118" }}
                  >
                    {ev.nome}
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>
                    📅{" "}
                    {new Date(ev.dataInicio).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
