// app/admin/doces/DoceForm.tsx  ← usado tanto em /novo quanto em /[id]
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DoceFormProps {
  doce?: {
    id: number;
    nome: string;
    descricao: string | null;
    preco: number;
    imagemUrl: string | null;
    categoria: string | null;
    disponivel: boolean;
    destaque: boolean;
  };
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid #ece8e4",
  borderRadius: 10,
  fontSize: 14,
  color: "#1a1118",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'DM Sans', sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#888",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
};

export default function DoceForm({ doce }: DoceFormProps) {
  const router = useRouter();
  const isEdit = !!doce;

  const [nome, setNome] = useState(doce?.nome ?? "");
  const [descricao, setDescricao] = useState(doce?.descricao ?? "");
  const [preco, setPreco] = useState(doce?.preco.toString() ?? "");
  const [imagemUrl, setImagemUrl] = useState(doce?.imagemUrl ?? "");
  const [categoria, setCategoria] = useState(doce?.categoria ?? "");
  const [disponivel, setDisponivel] = useState(doce?.disponivel ?? true);
  const [destaque, setDestaque] = useState(doce?.destaque ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = {
      nome,
      descricao: descricao || null,
      preco: parseFloat(preco),
      imagemUrl: imagemUrl || null,
      categoria: categoria || null,
      disponivel,
      destaque,
    };

    const url = isEdit ? `/api/admin/doces/${doce.id}` : "/api/admin/doces";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/doces");
      router.refresh();
    } else {
      setError("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <a href="/admin/doces" style={{ fontSize: 13, color: "#aaa", textDecoration: "none" }}>← Voltar</a>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1118", margin: "8px 0 6px", letterSpacing: "-0.5px" }}>
          {isEdit ? "✏️ Editar doce" : "🍬 Novo doce"}
        </h1>
      </div>

      <div style={{ maxWidth: 640 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0ece8", padding: "28px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#1a1118", margin: "0 0 20px" }}>Informações básicas</h2>

            {/* Nome */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Nome do doce *</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Brigadeiro de Nutella"
                required
                style={inputStyle}
              />
            </div>

            {/* Descrição */}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Uma breve descrição do doce..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Preço + Categoria */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Preço (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="0,00"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Categoria</label>
                <input
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  placeholder="Ex: Trufas, Brigadeiros..."
                  style={inputStyle}
                />
              </div>
            </div>

            {/* URL da imagem */}
            <div>
              <label style={labelStyle}>URL da imagem</label>
              <input
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                placeholder="https://..."
                style={inputStyle}
              />
              {imagemUrl && (
                <img src={imagemUrl} alt="Preview" style={{ marginTop: 10, width: 80, height: 80, borderRadius: 10, objectFit: "cover" }} />
              )}
            </div>
          </div>

          {/* Opções */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0ece8", padding: "28px", marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#1a1118", margin: "0 0 20px" }}>Opções</h2>

            {[
              { label: "Disponível para compra", desc: "Aparece como disponível na loja", value: disponivel, set: setDisponivel },
              { label: "Produto em destaque", desc: "Aparece em destaque na página inicial", value: destaque, set: setDestaque },
            ].map(({ label, desc, value, set }) => (
              <label key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, cursor: "pointer" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1118" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{desc}</div>
                </div>
                <div
                  onClick={() => set(!value)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 99,
                    background: value ? "#1a1118" : "#e5e0db",
                    position: "relative",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 3,
                    left: value ? 23 : 3,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }} />
                </div>
              </label>
            ))}
          </div>

          {error && (
            <div style={{ padding: "12px 16px", background: "#fff0f0", border: "1px solid #fecaca", borderRadius: 10, color: "#cc3333", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px 28px",
              background: loading ? "#ccc" : "#1a1118",
              color: "#f9c5d1",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar doce"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── /app/admin/doces/novo/page.tsx ───────────────────────────────────────────
// import DoceForm from "../DoceForm";
// export default function NovoDoccPage() { return <DoceForm />; }

// ─── /app/admin/doces/[id]/page.tsx ──────────────────────────────────────────
// import { prisma } from "@/lib/prisma";
// import DoceForm from "../DoceForm";
// export default async function EditarDocePage({ params }: { params: { id: string } }) {
//   const doce = await prisma.doce.findUnique({ where: { id: parseInt(params.id) } });
//   if (!doce) return <p>Doce não encontrado.</p>;
//   return <DoceForm doce={doce} />;
// }