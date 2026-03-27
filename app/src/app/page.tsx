"use client";

import { useEffect, useState } from "react";
import { getProdutosTodos } from "@/services/api";

export default function Home() {
  const [produtos, atualizarProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getProdutosTodos().then((resultado) => {
      atualizarProdutos(resultado.data.products);
    });
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>Pesquisa de produtos</h1>
        <input
          type="text"
          placeholder="Digite o nome do produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </header>

      <main>
        <h2>Lista de produtos</h2>

        {produtosFiltrados.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <img src={produto.images[0]} width={100} />
            <h3>{produto.title}</h3>
            <p>{produto.description}</p>
            <p>Preço: R$ {produto.price}</p>
            <p>Nota: {produto.rating}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
