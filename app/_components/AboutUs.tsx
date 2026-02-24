import Image from "next/image";

function AboutUs() {
  return (
    <div className="mt-20 space-y-8">
      <h2 className="text-center text-3xl font-semibold">Sobre Nós</h2>
      <div className="flex gap-3 p-6">
        <div className="w-[50%] h-60 space-y-4">
          <h2 className="text-center text-2xl font-semibold">Simara Souza</h2>
          <div className="relative w-full h-full">
            <Image
              alt="imagemmulher"
              src={"/mulher.jpg"}
              fill
              className="realtive"
            />
          </div>
        </div>
        <div className="w-[50%] flex bg-secondary h-full">
          <p>
            Nossa doceria nasceu na cozinha de casa, onde cada doce é preparado
            artesanalmente, com cuidado e dedicação. Sem loja física ou produção
            em larga escala, tudo é feito de forma caseira, com padrão
            profissional e muito carinho em cada detalhe. 💕
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
