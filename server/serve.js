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

const getStat = (pokemon) => {
  const attack = pokemon.stats.find(
    (stat) => stat.stat.name === 'attack',
  ).base_stat;
  const spAttack = pokemon.stats.find(
    (stat) => stat.stat.name === 'special-attack',
  ).base_stat;
  return Math.max(attack, spAttack);
};

const serveBattle = async (req, res, next) => {
  try {
    const { p1, p2 } = req.params;
    const resP1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${p1}`);
    const resP2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${p2}`);
    if (!resP1.ok || !resP2.ok) {
      throw new Error('Battle Failed');
    }
    const data1 = await resP1.json();
    const data2 = await resP2.json();
    const attack1 = getStat(data1);
    const attack2 = getStat(data2);
    let winner = null;
    if (attack1 > attack2) winner = data1.name;
    else winner = data2.name;
    res.send({
      p1: {
        attack: attack1,
        name: data1.name,
        sprite: data1.sprites.front_default,
      },
      p2: {
        attack: attack2,
        name: data2.name,
        sprite: data2.sprites.front_default,
      },
      winner: winner,
      error: null,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};

app.get('/api/pokemon/:nameOrId', servePokemon);
app.get('/api/battle/:p1/:p2', serveBattle);

app.use((req, res, next) => {
  res
    .status(404)
    .send({ error: `${req.originalUrl} is not a valid endpoint.` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
