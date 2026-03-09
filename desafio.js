const express = require("express");
const app = express();

app.use(express.json());

const musicas = [
  {
    id: 1,
    nomemusica: "Pay no Rent",
    autor: "Turnpike Troubadours",
    link: "https://www.youtube.com/watch?v=sieOSRVQh3Q&list=RDsieOSRVQh3Q&start_radio=1",
  },
  {
    id: 2,
    nomemusica: "Ain't Worth the Trouble",
    autor: "Turnpike Troubadours",
    link: "https://www.youtube.com/watch?v=TseY8RpsXwY&list=RDTseY8RpsXwY&start_radio=1",
  },
  {
    id: 3,
    nomemusica: "The Bad Help",
    autor: "The Black Angels",
    link: "https://www.youtube.com/watch?v=b9hBd4MwPcA&list=RDb9hBd4MwPcA&start_radio=1",
  },
  {
    id: 4,
    nomemusica: "You Can't Make Old Friends",
    autor: "Kenny Rogers & Dolly Parton",
    link: "https://www.youtube.com/watch?v=UaNGtgYwSsU&list=RDUaNGtgYwSsU&start_radio=1",
  },
];

//1
app.get("/musicas", (req, res) => {
  res.status(200).json(musicas);
});

//2
app.get("/musicas/nome/:nomeid", (req, res) => {
  const nome = req.params.nomeid.toLowerCase;
  const misc = musicas.find((m) => m.nomemusica.toLowerCase === nome);

  if (misc) {
    res.status(200).json(misc);
  } else {
    res
      .status(404)
      .json({ message: "este produto nao pode ser encontrada :(" });
  }
});

//3
app.get("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const misc = musicas.find((m) => m.id === id);

  if (misc) {
    res.status(200).json(misc);
  } else {
    res
      .status(404)
      .json({ message: "este produto nao pode ser encontrada :(" });
  }
});

proxid = 5;

//4
app.post("/musicas", (req, res) => {
  const { nomemusica, autor, link } = req.body;

  if (!nomemusica || !autor || !link) {
    return res.status(400).json({
      message: "Campos obrigatorios: nome da musica, autor, link",
    });
  }

  const novo = {
    id: proxid++,
    nomemusica: req.body.nomemusica,
    autor: req.body.autor,
    link: req.body.link,
  };

  musicas.push(novo);
  res.status(201).json(novo);
});

//5
app.put("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nomemusica, autor, link } = req.body;

  if (!nomemusica || !autor || !link) {
    return res.status(400).json({
      message: "Campos obrigatorios: nome da musica, autor, link",
    });
  }

  const index = musicas.findIndex((m) => m.id === id);

  if (index !== -1) {
    musicas[index] = {
      id,
      nomemusica,
      autor,
      link,
    };
    res.status(200).json(musicas[index]);
  } else {
    res.status(404).json({
      mensagem: `Produto ${id} não encontrado`,
    });
  }
});

//6
app.delete("/musicas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = musicas.findIndex((m) => m.id === id);

  if (index !== -1) {
    musicas.splice(index, 1);
    res.status(200).send({ message: "Produto removido com sucesso!" });
  } else {
    res.status(404).send({ message: "Produto não encontrado." });
  }
});

app.listen(3000, () => console.log("ready"));