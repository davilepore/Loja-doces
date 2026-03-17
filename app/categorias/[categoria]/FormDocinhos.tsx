import { useState } from "react";

type Props = {
  doceId: number;
};

function FormDocinhos({ doceId }: Props) {
  const [mensagem, setMensagem] = useState("");
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/carrinho", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doceId,
        quantidade: Number(formData.get("quantidade")),
        configuracoes: {},
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
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            min="1"
            max="100"
            defaultValue="1"
            step="1"
          />

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

export default FormDocinhos;
