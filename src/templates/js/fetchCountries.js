async function fetchCountries(searchQuery) {    
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`; 

    const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }     
};

export default fetchCountries