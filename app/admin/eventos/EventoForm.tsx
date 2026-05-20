"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Item {
  nome: string;
  descricao: string;
  preco: string;
  imagemUrl: string;
}

interface EventoFormProps {
  evento?: {
    id: number;
    titulo: string;
    descricao: string | null;
    dataInicio: string;
    dataFim: string | null;
    imagemUrl: string | null;
    ativo: boolean;
    itens: {
      nome: string;
      descricao: string | null;
      preco: number | null;
      imagemUrl: string | null;
    }[];
  };
}

const field =
  "w-full px-3.5 py-2.5 border border-[#ece8e4] rounded-xl text-sm text-[#1a1118] bg-white outline-none focus:border-pink-300 transition font-[DM_Sans]";
const label =
  "block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider";

export default function EventoForm({ evento }: EventoFormProps) {
  const router = useRouter();
  const isEdit = !!evento;

  const [titulo, setTitulo] = useState(evento?.titulo ?? "");
  const [descricao, setDescricao] = useState(evento?.descricao ?? "");
  const [dataInicio, setDataInicio] = useState(
    evento?.dataInicio?.slice(0, 10) ?? "",
  );
  const [dataFim, setDataFim] = useState(evento?.dataFim?.slice(0, 10) ?? "");
  const [imagemUrl, setImagemUrl] = useState(evento?.imagemUrl ?? "");
  const [ativo, setAtivo] = useState(evento?.ativo ?? true);
  const [itens, setItens] = useState<Item[]>(
    evento?.itens.map((i) => ({
      nome: i.nome,
      descricao: i.descricao ?? "",
      preco: i.preco?.toString() ?? "",
      imagemUrl: i.imagemUrl ?? "",
    })) ?? [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addItem() {
    setItens([...itens, { nome: "", descricao: "", preco: "", imagemUrl: "" }]);
  }

  function updateItem(index: number, field: keyof Item, value: string) {
    setItens(
      itens.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeItem(index: number) {
    setItens(itens.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const body = {
      titulo,
      descricao: descricao || null,
      dataInicio,
      dataFim: dataFim || null,
      imagemUrl: imagemUrl || null,
      ativo,
      itens: itens
        .filter((i) => i.nome.trim())
        .map((i) => ({
          nome: i.nome,
          descricao: i.descricao || null,
          preco: i.preco ? parseFloat(i.preco) : null,
          imagemUrl: i.imagemUrl || null,
        })),
    };

    const url = isEdit
      ? `/api/admin/eventos/${evento.id}`
      : "/api/admin/eventos";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/eventos");
      router.refresh();
    } else {
      setError("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="p-10 font-[DM_Sans]">
      <div className="mb-8">
        <a
          href="/admin/eventos"
          className="text-xs text-gray-400 hover:text-gray-600 transition"
        >
          ← Voltar
        </a>
        <h1 className="text-3xl font-bold text-[#1a1118] tracking-tight mt-2">
          {isEdit ? "✏️ Editar evento" : "🎉 Novo evento"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="bg-white rounded-2xl border border-[#f0ece8] p-7">
          <h2 className="text-sm font-semibold text-[#1a1118] mb-5">
            Informações do evento
          </h2>

          <div className="mb-4">
            <label className={label}>Título *</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Páscoa 2025"
              required
              className={field}
            />
          </div>

          <div className="mb-4">
            <label className={label}>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              placeholder="Descreva o evento..."
              className={`${field} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={label}>Data de início *</label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
                className={field}
              />
            </div>
            <div>
              <label className={label}>Data de fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className={field}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={label}>URL da imagem</label>
            <input
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="https://..."
              className={field}
            />
            {imagemUrl && (
              <img
                src={imagemUrl}
                alt="Preview"
                className="mt-2 w-20 h-20 rounded-xl object-cover"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-sm font-medium text-[#1a1118]">Evento ativo</p>
              <p className="text-xs text-gray-400">
                Aparece na loja para os clientes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAtivo(!ativo)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${ativo ? "bg-[#1a1118]" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${ativo ? "left-[22px]" : "left-0.5"}`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#f0ece8] p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-[#1a1118]">
                Itens do evento
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Ex: Kit Festa, Caixa Especial, Combo...
              </p>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="text-xs bg-[#fdf2f4] text-pink-600 px-3.5 py-2 rounded-lg font-semibold hover:bg-pink-100 transition"
            >
              + Adicionar item
            </button>
          </div>

          {itens.length === 0 ? (
            <div className="text-center py-8 text-gray-300 text-sm border-2 border-dashed border-[#f0ece8] rounded-xl">
              Nenhum item adicionado ainda
            </div>
          ) : (
            <div className="space-y-4">
              {itens.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#faf7f5] rounded-xl border border-[#f0ece8]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Item {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-xs text-red-400 hover:text-red-600 transition"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className={label}>Nome *</label>
                      <input
                        value={item.nome}
                        onChange={(e) =>
                          updateItem(index, "nome", e.target.value)
                        }
                        placeholder="Ex: Kit Festa"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={label}>Preço (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.preco}
                        onChange={(e) =>
                          updateItem(index, "preco", e.target.value)
                        }
                        placeholder="0,00"
                        className={field}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className={label}>Descrição</label>
                    <input
                      value={item.descricao}
                      onChange={(e) =>
                        updateItem(index, "descricao", e.target.value)
                      }
                      placeholder="Descrição do item..."
                      className={field}
                    />
                  </div>

                  <div>
                    <label className={label}>URL da imagem</label>
                    <input
                      value={item.imagemUrl}
                      onChange={(e) =>
                        updateItem(index, "imagemUrl", e.target.value)
                      }
                      placeholder="https://..."
                      className={field}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-7 py-3.5 bg-[#1a1118] text-[#f9c5d1] rounded-xl text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition"
        >
          {loading
            ? "Salvando..."
            : isEdit
              ? "Salvar alterações"
              : "Criar evento"}
        </button>
      </form>
    </div>
  );
}
