"use client";

import { useState } from "react";
import { addToCart, BoloConfigs } from "@/lib/actions";

type Props = {
  doceId: number;
};

function FormBolos({ doceId }: Props) {
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);

    const formData = new FormData(e.currentTarget);

    const configs: BoloConfigs = {
      massa: String(formData.get("massa")),
      recheio: String(formData.get("recheio")),
      tamanho: String(formData.get("tamanho")),
    };

    try {
      const res = await addToCart(doceId, 1, configs);

      if (res.ok) {
        setMensagem("Adicionado ao carrinho!");
      } else {
        setMensagem("Erro ao adicionar ao carrinho");
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor");
    } finally {
      setCarregando(false);

      setTimeout(() => setMensagem(""), 2000);
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Massa</label>
            <select className="border rounded-md p-2" name="massa" required>
              <option value="amanteigada">Amanteigada</option>
              <option value="chocolate">Chocolate</option>
              <option value="mesclada">Mesclada</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Recheio</label>
            <select className="border rounded-md p-2" name="recheio" required>
              <option value="brigadeiro">Brigadeiro</option>
              <option value="limao">Limão</option>
              <option value="pacoca">Paçoca</option>
              <option value="churos">Churros</option>
              <option value="branco">Brigadeiro Branco</option>
              <option value="beijinho">Beijinho</option>
              <option value="nozes">Nozes</option>
              <option value="ninho">Ninho</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Tamanho</label>
            <select className="border rounded-md p-2" name="tamanho" required>
              <option value="15cm">15cm - 12 a 15 fatias</option>
              <option value="20cm">20cm - 22 a 25 fatias</option>
              <option value="25cm">25cm - 42 a 45 fatias</option>
              <option value="30cm">30cm - 60 fatias</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className={`w-full bg-black text-white py-2 rounded-lg transition-all ${
              carregando ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
          >
            {carregando ? "Adicionando..." : "Adicionar"}
          </button>
        </form>
      </div>

      {mensagem && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-lg shadow-2xl z-50 text-white font-medium animate-in fade-in zoom-in duration-300 ${
            mensagem.includes("Erro") ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {mensagem}
        </div>
      )}
    </>
  );
}

export default FormBolos;
