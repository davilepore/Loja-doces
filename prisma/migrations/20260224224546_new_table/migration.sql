-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('BOLOS', 'DOCINHOS', 'SOBREMESAS');

-- CreateEnum
CREATE TYPE "Especificacao" AS ENUM ('CASEIRO', 'VULCAO', 'ANIVERSARIO', 'GOURMET', 'FINOS', 'BROWNIES', 'TRAVESSA', 'COOKIES');

-- CreateTable
CREATE TABLE "Doce" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "especificacao" "Especificacao" NOT NULL,
    "imagemUrl" TEXT NOT NULL,

    CONSTRAINT "Doce_pkey" PRIMARY KEY ("id")
);
