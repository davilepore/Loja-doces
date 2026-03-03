function FormBolos() {
  return (
    <div>
      <form action="POST">
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

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default FormBolos;
