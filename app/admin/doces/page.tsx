// app/admin/doces/page.tsx
import { prisma } from "@/prisma/seed";
import Link from "next/link";
import DeleteDoceButton from "./DeleteDoceButton";

export default async function DocesPage() {
  const doces = await prisma.doce.findMany({ orderBy: { criadoEm: "desc" } });

  return (
    <div style={{ padding: "40px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1a1118",
              margin: "0 0 6px",
              letterSpacing: "-0.5px",
            }}
          >
            🍬 Doces
          </h1>
          <p style={{ color: "#888", fontSize: 15, margin: 0 }}>
            {doces.length} doce(s) cadastrado(s)
          </p>
        </div>
        <Link
          href="/admin/doces/novo"
          style={{
            padding: "12px 20px",
            background: "#1a1118",
            color: "#f9c5d1",
            borderRadius: 10,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          + Novo doce
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #f0ece8",
          overflow: "hidden",
        }}
      >
        {doces.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🍬</div>
            <p style={{ color: "#bbb", fontSize: 15 }}>
              Nenhum doce cadastrado ainda.
            </p>
            <Link
              href="/admin/doces/novo"
              style={{ color: "#c084a8", fontSize: 14 }}
            >
              Cadastrar primeiro doce →
            </Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#faf7f5" }}>
                {[
                  "Doce",
                  "Categoria",
                  "Preço",
                  "Status",
                  "Destaque",
                  "Ações",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 20px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      borderBottom: "1px solid #f0ece8",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doces.map((doce, i) => (
                <tr
                  key={doce.id}
                  style={{
                    borderBottom:
                      i < doces.length - 1 ? "1px solid #faf7f5" : "none",
                    transition: "background 0.1s",
                  }}
                >
                  {/* Nome + imagem */}
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      {doce.imagemUrl ? (
                        <img
                          src={doce.imagemUrl}
                          alt={doce.nome}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: "#fdf2f4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                          }}
                        >
                          🍬
                        </div>
                      )}
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
                        {doce.descricao && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#aaa",
                              marginTop: 2,
                              maxWidth: 200,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {doce.descricao}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Categoria */}
                  <td style={{ padding: "16px 20px" }}>
                    {doce.categoria ? (
                      <span
                        style={{
                          fontSize: 12,
                          padding: "4px 10px",
                          borderRadius: 99,
                          background: "#fdf2f4",
                          color: "#b05070",
                        }}
                      >
                        {doce.categoria}
                      </span>
                    ) : (
                      <span style={{ fontSize: 12, color: "#ccc" }}>—</span>
                    )}
                  </td>

                  {/* Preço */}
                  <td
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1118",
                    }}
                  >
                    R$ {doce.preco.toFixed(2).replace(".", ",")}
                  </td>

                  {/* Disponível */}
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "4px 10px",
                        borderRadius: 99,
                        background: doce.disponivel ? "#d1fae5" : "#fee2e2",
                        color: doce.disponivel ? "#065f46" : "#991b1b",
                      }}
                    >
                      {doce.disponivel ? "Disponível" : "Indisponível"}
                    </span>
                  </td>

                  {/* Destaque */}
                  <td style={{ padding: "16px 20px", fontSize: 14 }}>
                    {doce.destaque ? (
                      "⭐ Sim"
                    ) : (
                      <span style={{ color: "#ccc" }}>Não</span>
                    )}
                  </td>

                  {/* Ações */}
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link
                        href={`/admin/doces/${doce.id}`}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 8,
                          background: "#faf7f5",
                          color: "#555",
                          fontSize: 13,
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        ✏️ Editar
                      </Link>
                      <DeleteDoceButton id={doce.id} nome={doce.nome} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
