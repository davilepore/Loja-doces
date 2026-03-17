import Image from "next/image";

function AboutUs() {
  return (
    <section className="mt-24 px-6 mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-[#44201F]">
            Nossa História
          </h2>
          <div className="w-24 h-1.5 bg-[#7dd0c2] mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#7dd0c2] rounded-3xl -z-10 group-hover:top-0 group-hover:left-0 transition-all duration-300"></div>

            <div className="relative h-100 md:h-125 w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                alt="Simara Souza - Fundadora da Doces MaBecky"
                src="/mulher.jpg"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="absolute -bottom-4 right-6 bg-white px-8 py-3 rounded-full shadow-lg border border-[#7dd0c2]/20">
              <span className="text-[#44201F] font-bold text-xl italic">
                Simara Souza
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-[#7dd0c2]/10 text-[#44201F] text-sm font-bold tracking-wider uppercase">
              Feito com Amor
            </div>

            <h3 className="text-3xl md:text-4xl font-semibold text-[#44201F] leading-tight">
              Onde a doçura encontra o{" "}
              <span className="text-[#7dd0c2]">cuidado artesanal</span>
            </h3>

            <div className="space-y-4 text-[#44201F]/80">
              <p className="text-lg md:text-xl leading-relaxed">
                Nossa doceria nasceu na cozinha de casa, onde cada receita é um
                segredo compartilhado e cada doce é preparado artesanalmente,
                com total dedicação.
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                Acreditamos que o segredo do sabor está no{" "}
                <strong>padrão profissional</strong> aliado ao carinho em cada
                detalhe. O resultado? Momentos inesquecíveis em forma de açúcar.
                💕
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
