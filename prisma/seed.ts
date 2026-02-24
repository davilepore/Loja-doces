import "dotenv/config";
import {
  PrismaClient,
  Categoria,
  Especificacao,
} from "@/generated/prisma/client";

import { PrismaNeon } from "@prisma/adapter-neon";
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
export const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(Object.keys(prisma));

  const doces = [
    // BOLOS
    {
      id: 1,
      nome: "Bolo de Cenoura Caseiro",
      categoria: Categoria.BOLOS,
      especificacao: Especificacao.CASEIRO,
      imagemUrl:
        "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=500",
    },
    {
      id: 2,
      nome: "Vulcão de Ninho com Nutella",
      categoria: Categoria.BOLOS,
      especificacao: Especificacao.VULCAO,
      imagemUrl:
        "https://images.unsplash.com/photo-1586985289906-406988974504?w=500",
    },
    {
      id: 3,
      nome: "Bolo de Festa Red Velvet",
      categoria: Categoria.BOLOS,
      especificacao: Especificacao.ANIVERSARIO,
      imagemUrl:
        "https://images.unsplash.com/photo-1586788680434-30d324634bf6?w=500",
    },
    {
      id: 4,
      nome: "Bolo de Fubá com Goiabada",
      categoria: Categoria.BOLOS,
      especificacao: Especificacao.CASEIRO,
      imagemUrl:
        "https://images.unsplash.com/photo-1602351447937-745cb720612f?w=500",
    },
    {
      id: 5,
      nome: "Vulcão de Chocolate Belga",
      categoria: Categoria.BOLOS,
      especificacao: Especificacao.VULCAO,
      imagemUrl:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
      id: 6,
      nome: "Bolo de Casamento Clássico",
      categoria: Categoria.BOLOS,
      especificacao: Especificacao.ANIVERSARIO,
      imagemUrl:
        "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?w=500",
    },

    // DOCINHOS
    {
      id: 7,
      nome: "Brigadeiro Belga 70%",
      categoria: Categoria.DOCINHOS,
      especificacao: Especificacao.GOURMET,
      imagemUrl:
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500",
    },
    {
      id: 8,
      nome: "Camafeu de Nozes Tradicional",
      categoria: Categoria.DOCINHOS,
      especificacao: Especificacao.FINOS,
      imagemUrl:
        "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500",
    },
    {
      id: 9,
      nome: "Beijinho de Coco Queimado",
      categoria: Categoria.DOCINHOS,
      especificacao: Especificacao.GOURMET,
      imagemUrl:
        "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500",
    },
    {
      id: 10,
      nome: "Trufa de Champagne",
      categoria: Categoria.DOCINHOS,
      especificacao: Especificacao.FINOS,
      imagemUrl:
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500",
    },
    {
      id: 11,
      nome: "Docinho de Pistache Iraniano",
      categoria: Categoria.DOCINHOS,
      especificacao: Especificacao.GOURMET,
      imagemUrl:
        "https://images.unsplash.com/photo-1571506191039-6510659227f2?w=500",
    },

    // SOBREMESAS
    {
      id: 12,
      nome: "Brownie de Caramelo Salgado",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.BROWNIES,
      imagemUrl:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
    },
    {
      id: 13,
      nome: "Pavê de Chocolate Suíço",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.TRAVESSA,
      imagemUrl:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500",
    },
    {
      id: 14,
      nome: "Cookie Triple Chocolate",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.COOKIES,
      imagemUrl:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
    },
    {
      id: 15,
      nome: "Brownie com Castanhas",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.BROWNIES,
      imagemUrl:
        "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500",
    },
    {
      id: 16,
      nome: "Mousse de Maracujá na Travessa",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.TRAVESSA,
      imagemUrl:
        "https://images.unsplash.com/photo-1528451634235-95ab663e001f?w=500",
    },
    {
      id: 17,
      nome: "Cookie Red Velvet & White Chocolate",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.COOKIES,
      imagemUrl:
        "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?w=500",
    },
    {
      id: 18,
      nome: "Tiramisù Artesanal",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.TRAVESSA,
      imagemUrl:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
    },
    {
      id: 19,
      nome: "Cookie de Aveia e Passas",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.COOKIES,
      imagemUrl:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500",
    },
    {
      id: 20,
      nome: "Brownie Vegano 100% Cacau",
      categoria: Categoria.SOBREMESAS,
      especificacao: Especificacao.BROWNIES,
      imagemUrl:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500",
    },
  ];

  console.log("Iniciando o seed...");

  for (const doce of doces) {
    await prisma.doce.upsert({
      where: { id: doce.id },
      update: {},
      create: doce,
    });
  }

  console.log("Seed finalizado com sucesso! 🍰");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
