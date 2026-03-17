import { useState } from "react";

type Props = {
  doceId: number;
};

function FormBolos({ doceId }: Props) {
  const [mensagem, setMensagem] = useState("");
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/carrinho", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doceId,
        quantidade: 1,
        configuracoes: {
          massa: formData.get("massa"),
          recheio: formData.get("recheio"),
          tamanho: formData.get("tamanho"),
        },
      }),
    });
    if (res.ok) {
      setMensagem("Adicionado ao carrinho!");
    } else {
      setMensagem("Erro ao adicionar ao carrinho");
    }

    setTimeout(() => setMensagem(""), 2000);
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <select className="border rounded-md p-1" name="massa" id="massa">
            <option value="amanteigada">Amanteigada</option>
            <option value="chocolate">Chocolate</option>
            <option value="mesclada">Mesclada</option>
          </select>

          <select className="border rounded-md p-1" name="recheio" id="recheio">
            <option value="brigadeiro">Brigadeiro</option>
            <option value="limao">Limão</option>
            <option value="pacoca">Paçoca</option>
            <option value="churos">Churros</option>
            <option value="branco">Brigadeiro Branco</option>
            <option value="beijinho">Beijinho</option>
            <option value="nozes">Nozes</option>
            <option value="ninho">Ninho</option>
          </select>

          <select className="border rounded-md p-1" name="tamanho" id="tamanho">
            <option value="">15cm - 12 a 15 fatias</option>
            <option value="">20cm - 22 a 25 fatias</option>
            <option value="">25cm - 42 a 45 fatias</option>
            <option value="">30cm - 60 fatias</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Adicionar
          </button>
        </form>
      </div>
      {mensagem && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${mensagem ? "bg-green-500" : "bg-red-500"} text-white px-6 py-3 rounded-lg shadow-lg`}
        >
          {mensagem}
        </div>
      )}
    </>
  );
}

export default FormBolos;
