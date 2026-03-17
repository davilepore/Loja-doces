type Props = {
  doceId: number;
};
function FormSobremesas({ doceId }: Props) {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await fetch("/api/carrinho", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doceId,
        quantidade: Number(formData.get("quantidade")),
        configuracoes: {},
      }),
    });
  }

  return (
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
  );
}

export default FormSobremesas;
