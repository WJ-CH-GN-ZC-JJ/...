import { getPokemonByName } from './fetch-helpers.js';
import { renderPokemonInfo } from './dom-helpers.js';
const form = document.querySelector('#search-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pokemonName = form.elements.query.value.trim();
  const pokemonInfo = await getPokemonByName(pokemonName);
  renderPokemonInfo(pokemonInfo);
  form.reset();
});
