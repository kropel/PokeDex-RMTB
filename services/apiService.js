export const fetchData = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
