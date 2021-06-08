const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const routes = require('./routes');
require('./database/setup');
require('./services/mailer');

const port = process.env.SERVER_PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('/web/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () =>
  console.log(
    `o servidor está rodando em http://localhost:${port} com sucesso! 🔥🔥`
  )
);
