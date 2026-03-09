const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const produtos = [
    { id: 1, nome: 'killer queen', autor: 'Freddie Mercury', album: 'Sheer Heart Attack', preço: 150.00 },
    { id: 2, nome: 'Red Hot Chili Pepper', autor: 'Red Hot Chili Peppers', album: 'Unlimited Love', preço: 80.00 },
    { id: 3, nome: 'dirty deeds done dirt cheap', autor: 'AC/DC', album: 'Dirty Deeds Done Dirt Cheap', preço: 270.00 }
];

app.get('/musicas', (req, res) => {
// Status 200 = OK (sucesso)
res.status(200).json(produtos);
});

app.get('/musicas/:id', (req, res) => {
// Status 200 = OK (sucesso)
const id = parseInt(req.params.id);
const musica = produtos.find(m => m.id === id);
if (musica) {
  res.status(200).json(musica);
} else {
  res.status(404).json({ message: "Música não encontrada" });
}
});

app.listen(PORT, app, () => {
  console.log(`servirdor rodando em http://localhost:${PORT}`);
});