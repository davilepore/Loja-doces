import 'dotenv/config'
import { PrismaClient } from "@/generated/prisma/client"

import { PrismaNeon } from '@prisma/adapter-neon'
const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
})
export const prisma = new PrismaClient({ adapter })


async function main() {
    console.log(Object.keys(prisma))

  await prisma.doces.createMany({
    data: [
    // BOLOS - CASEIRO
    {
      nome: "Bolo de Cenoura com Chocolate",
      tipo: "bolos",
      especificacao: "caseiro",
      imageUrl: "https://exemplo.com/bolo-cenoura.jpg",
    },
    {
      nome: "Bolo de Fubá Cremoso",
      tipo: "bolos",
      especificacao: "caseiro",
      imageUrl: "https://exemplo.com/bolo-fuba.jpg",
    },

    // BOLOS - VULCAO
    {
      nome: "Bolo Vulcão de Brigadeiro",
      tipo: "bolos",
      especificacao: "vulcao",
      imageUrl: "https://exemplo.com/bolo-vulcao-brigadeiro.jpg",
    },
    {
      nome: "Bolo Vulcão de Leite Ninho",
      tipo: "bolos",
      especificacao: "vulcao",
      imageUrl: "https://exemplo.com/bolo-vulcao-ninho.jpg",
    },

    // BOLOS - ANIVERSARIO
    {
      nome: "Bolo de Aniversário Chocolate com Morango",
      tipo: "bolos",
      especificacao: "aniversario",
      imageUrl: "https://exemplo.com/bolo-aniversario-chocolate.jpg",
    },
    {
      nome: "Bolo de Aniversário Red Velvet",
      tipo: "bolos",
      especificacao: "aniversario",
      imageUrl: "https://exemplo.com/bolo-redvelvet.jpg",
    },

    // DOCINHOS - GOURMET
    {
      nome: "Brigadeiro Belga",
      tipo: "docinhos",
      especificacao: "gourmet",
      imageUrl: "https://exemplo.com/brigadeiro-belga.jpg",
    },
    {
      nome: "Beijinho Gourmet de Coco Queimado",
      tipo: "docinhos",
      especificacao: "gourmet",
      imageUrl: "https://exemplo.com/beijinho-gourmet.jpg",
    },
    {
      nome: "Casadinho Gourmet",
      tipo: "docinhos",
      especificacao: "gourmet",
      imageUrl: "https://exemplo.com/casadinho.jpg",
    },

    // DOCINHOS - FINOS
    {
      nome: "Camafeu de Nozes",
      tipo: "docinhos",
      especificacao: "finos",
      imageUrl: "https://exemplo.com/camafeu.jpg",
    },
    {
      nome: "Olho de Sogra Fino",
      tipo: "docinhos",
      especificacao: "finos",
      imageUrl: "https://exemplo.com/olho-de-sogra.jpg",
    },
    {
      nome: "Trufa de Chocolate Meio Amargo",
      tipo: "docinhos",
      especificacao: "finos",
      imageUrl: "https://exemplo.com/trufa.jpg",
    },

    // SOBREMESAS - DOCES DE TRAVESSA
    {
      nome: "Pavê de Chocolate",
      tipo: "sobremesas",
      especificacao: "doces de travessa",
      imageUrl: "https://exemplo.com/pave.jpg",
    },
    {
      nome: "Mousse de Maracujá na Travessa",
      tipo: "sobremesas",
      especificacao: "doces de travessa",
      imageUrl: "https://exemplo.com/mousse-maracuja.jpg",
    },
    {
      nome: "Banoffee na Travessa",
      tipo: "sobremesas",
      especificacao: "doces de travessa",
      imageUrl: "https://exemplo.com/banoffee.jpg",
    },

    // SOBREMESAS - BROWNIES
    {
      nome: "Brownie Tradicional",
      tipo: "sobremesas",
      especificacao: "brownies",
      imageUrl: "https://exemplo.com/brownie.jpg",
    },
    {
      nome: "Brownie com Nozes",
      tipo: "sobremesas",
      especificacao: "brownies",
      imageUrl: "https://exemplo.com/brownie-nozes.jpg",
    },

    // SOBREMESAS - BOLOS DE POTE
    {
      nome: "Bolo de Pote de Morango",
      tipo: "sobremesas",
      especificacao: "bolos de pote",
      imageUrl: "https://exemplo.com/bolo-pote-morango.jpg",
    },
    {
      nome: "Bolo de Pote de Ninho com Nutella",
      tipo: "sobremesas",
      especificacao: "bolos de pote",
      imageUrl: "https://exemplo.com/bolo-pote-ninho.jpg",
    },
    {
      nome: "Bolo de Pote de Prestígio",
      tipo: "sobremesas",
      especificacao: "bolos de pote",
      imageUrl: "https://exemplo.com/bolo-pote-prestigio.jpg",
    },
  ],
  })

  console.log("Banco populado com sucesso 🚀")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


