function FormSobremesas() {
  return (
    <div>
      <form action="POST">
        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          min="1"
          max="100"
          value="1"
          step="1"
        />

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default FormSobremesas;
