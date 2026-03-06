const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

const pathToHome = path.join(__dirname, '../frontend');
const serveStatic = express.static(pathToHome);
app.use(serveStatic);

const servePokemon = async (req, res, next) => {
  try {
    const nameOrId = req.params.nameOrId;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`,
    );
    if (!response.ok) {
      throw new Error('Fetch Failed');
    }
    const data = await response.json();
    res.send({ data: data, error: null });
  } catch (error) {
    res.send({ data: null, error: error.message });
  }
};

app.get('/api/pokemon/:nameOrId', servePokemon);

app.use((req, res, next) => {
  res
    .status(404)
    .send({ error: `${req.originalUrl} is not a valid endpoint.` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
