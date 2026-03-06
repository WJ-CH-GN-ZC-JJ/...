export const getPokemonByName = async (name) => {
  const res = await fetch(`/api/pokemon/${name}`);
  const resData = await res.json();
  if (resData.error) {
    console.warn('An error occured');
    return;
  }
  return resData.data;
};
