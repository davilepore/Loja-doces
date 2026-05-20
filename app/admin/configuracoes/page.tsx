"use client";
import { useEffect, useState } from "react";

const campos = [
  {
    chave: "nome_loja",
    label: "Nome da loja",
    placeholder: "Doceria da Maria",
    icon: "🍭",
    type: "text",
  },
  {
    chave: "telefone",
    label: "Telefone",
    placeholder: "(21) 99999-9999",
    icon: "📞",
    type: "text",
  },
  {
    chave: "whatsapp",
    label: "WhatsApp",
    placeholder: "5521999999999",
    icon: "💬",
    type: "text",
  },
  {
    chave: "email",
    label: "E-mail",
    placeholder: "contato@doceria.com",
    icon: "📧",
    type: "email",
  },
  {
    chave: "instagram",
    label: "Instagram",
    placeholder: "@doceriadamaria",
    icon: "📸",
    type: "text",
  },
  {
    chave: "endereco",
    label: "Endereço",
    placeholder: "Rua das Flores, 123 — RJ",
    icon: "📍",
    type: "text",
  },
  {
    chave: "horario",
    label: "Horário",
    placeholder: "Seg–Sex 9h–18h",
    icon: "🕐",
    type: "text",
  },
  {
    chave: "sobre",
    label: "Sobre a loja",
    placeholder: "Conte um pouco sobre você...",
    icon: "💬",
    type: "textarea",
  },
];

export default function ConfiguracoesPage() {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/configuracoes")
      .then((r) => r.json())
      .then((data) => {
        setValores(data);
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    const res = await fetch("/api/admin/configuracoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valores),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError("Erro ao salvar. Tente novamente.");
    }
    setSaving(false);
  }

  const field =
    "w-full px-3.5 py-2.5 border border-[#ece8e4] rounded-xl text-sm text-[#1a1118] bg-white outline-none focus:border-pink-300 transition";

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1118] tracking-tight">
          ⚙️ Configurações
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Informações de contato e detalhes da sua loja.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-gray-400 text-sm py-16 justify-center">
          <span className="animate-spin text-lg">⏳</span> Carregando...
        </div>
      ) : (
        <form onSubmit={handleSave} className="max-w-xl space-y-4">
          <div className="bg-white rounded-2xl border border-[#f0ece8] p-7">
            <h2 className="text-sm font-semibold text-[#1a1118] mb-5">
              📞 Contato e redes sociais
            </h2>
            <div className="space-y-4">
              {campos
                .filter(
                  (c) =>
                    c.chave !== "sobre" &&
                    c.chave !== "endereco" &&
                    c.chave !== "horario" &&
                    c.chave !== "nome_loja",
                )
                .map((campo) => (
                  <div key={campo.chave}>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                      {campo.icon} {campo.label}
                    </label>
                    <input
                      type={campo.type}
                      value={valores[campo.chave] ?? ""}
                      onChange={(e) =>
                        setValores({
                          ...valores,
                          [campo.chave]: e.target.value,
                        })
                      }
                      placeholder={campo.placeholder}
                      className={field}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#f0ece8] p-7">
            <h2 className="text-sm font-semibold text-[#1a1118] mb-5">
              🏪 Informações da loja
            </h2>
            <div className="space-y-4">
              {campos
                .filter((c) =>
                  ["nome_loja", "endereco", "horario"].includes(c.chave),
                )
                .map((campo) => (
                  <div key={campo.chave}>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                      {campo.icon} {campo.label}
                    </label>
                    <input
                      type="text"
                      value={valores[campo.chave] ?? ""}
                      onChange={(e) =>
                        setValores({
                          ...valores,
                          [campo.chave]: e.target.value,
                        })
                      }
                      placeholder={campo.placeholder}
                      className={field}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#f0ece8] p-7">
            <h2 className="text-sm font-semibold text-[#1a1118] mb-5">
              💬 Sobre a loja
            </h2>
            <textarea
              value={valores["sobre"] ?? ""}
              onChange={(e) =>
                setValores({ ...valores, sobre: e.target.value })
              }
              placeholder="Conte um pouco sobre a sua loja..."
              rows={4}
              className={`${field} resize-none`}
            />
          </div>

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-sm flex items-center gap-2">
              ✅ Configurações salvas com sucesso!
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-7 py-3.5 bg-[#1a1118] text-[#f9c5d1] rounded-xl text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition"
          >
            {saving ? "Salvando..." : "Salvar configurações"}
          </button>
        </form>
      )}
    </div>
  );
}
