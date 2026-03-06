export const renderPokemonInfo = (pokemonJSON) => {
  const pokemonInfo = document.querySelector('#pokemon-info');
  console.log(pokemonJSON);
  if (!pokemonJSON) {
    pokemonInfo.textContent = 'Pokemon not found.';
    return;
  }
  pokemonInfo.textContent = JSON.stringify(pokemonJSON, null, 2);
};
