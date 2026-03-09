const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const produtos = [
    { id: 1, nome: 'Notebook', preco: 3500.0, estoque: 10, categoria: 'Eletrônicos' },
    { id: 2, nome: 'Mouse', preco: 150.0, estoque: 50, categoria: 'Eletrônicos' },
    { id: 3, nome: 'teclado', preco: 200.0, estoque: 25, categoria: 'Eletrônicos' }
];

let proximoId = 4;

app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

app.post("/produtos", (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;

  if (!nome || !preco || !estoque || !categoria) {
    return res.status(400).json({
      mensagem: "Campos obrigatórios: nome, preco, estoque, categoria",
    });
  }

  if (parseFloat(preco) <= 0) {
  return res.status(400).json({mensagem: "Preço deve ser maior que zero",
    });
  }

  if (parseInt(estoque) <= 0) {
  return res.status(400).json({mensagem: "Estoque deve ser maior que zero",
    });
  }

  const novo = {
    id: proximoId++,
    nome: req.body.nome,
    preco: req.body.preco,
    estoque: req.body.estoque,
    categoria: req.body.categoria,
  };
  produtos.push(novo);
  res.status(201).json(novo); // 201 = create
});

app.get('/produtos/nome/:nomeid', (req, res) => {
// Status 200 = OK (sucesso)
const nome = req.params.nomeid.toLowerCase();
const produto = produtos.find(m => m.nome.toLowerCase() === nome);
if (produto) {
  res.status(200).json(produto);
} else {
  res.status(404).json({ message: "Produto não encontrada" });
}
});


app.get('/produto/:id', (req, res) => {
// Status 200 = OK (sucesso)
const id = parseInt(req.params.id);
const produto = produtos.find(m => m.id === id);
if (produto) {
  res.status(200).json(produto);
} else {
  res.status(404).json({ message: "Produto não encontrado" });
}
});

app.put('/produtos/:id', (req, res) => {
const id = parseInt(req.params.id);
const { nome, preco, estoque, categoria } = req.body;
if (!nome || !preco || !estoque || !categoria) {
return res.status(400).json({
mensagem: 'Todos os campos são obrigatórios'
});
}
const index = produtos.findIndex(p => p.id === id);
if (index !== -1) {
// Substituir o objeto mantendo o ID original
produtos[index] = {
id,
nome,
preco: parseFloat(preco),
estoque: parseInt(estoque),
categoria
};
res.status(200).json(produtos[index]);
} else {
res.status(404).json({
mensagem: `Produto ${id} não encontrado`
});
}
});

app.delete('/produtos/:id', (req, res) => {
const id = parseInt(req.params.id);
const index = produtos.findIndex(p => p.id === id);
if (index !== -1) {
// splice(posicao, quantidade) — remove 1 item na posição
produtos.splice(index, 1);
res.status(200).json({mensagem: `Produto ${id} removido com sucesso`});
} else {
res.status(404).json({mensagem: `Produto ${id} não encontrado`});
}
});


app.listen(PORT, app, () => {
  console.log(`servirdor rodando em http://localhost:${PORT}`);
});