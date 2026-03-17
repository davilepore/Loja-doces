import Image from "next/image";

function AboutUs() {
  return (
    <div className="mt-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-[#44201F] mt-10">Sobre Nós</h2>
          <div className="w-20 h-1 bg-[#7dd0c2] mx-auto rounded-full"></div>
        </div>

        <div className="flex items-stretch gap-4 border-2 p-4">
          <div className="w-[45%] space-y-3">
            <h3 className="text-center text-lg md:text-2xl font-semibold">
              Simara Souza
            </h3>

            <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden shadow-md">
              <Image
                alt="Simara Souza"
                src="/mulher.jpg"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-[55%] bg-secondary rounded-2xl p-4 md:p-8 shadow-md flex items-center">
            <p className="text-sm md:text-lg leading-relaxed">
              Nossa doceria nasceu na cozinha de casa, onde cada doce é
              preparado artesanalmente, com cuidado e dedicação. Tudo é feito de
              forma caseira, com padrão profissional e muito carinho em cada
              detalhe. 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
