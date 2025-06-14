const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('Maria IA está online!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});