const pokemonName = document.querySelector('.pokemon_name') as HTMLSpanElement;
const pokemonNumber = document.querySelector('.pokemon_number') as HTMLSpanElement;
const pokemonImage = document.querySelector('.pokemon_image') as HTMLImageElement;

const form = document.querySelector('.form') as HTMLFormElement;
const input = document.querySelector('.input_search') as HTMLInputElement;
const buttonPrev = document.querySelector('.btn-prev') as HTMLButtonElement;
const buttonNext = document.querySelector('.btn-next') as HTMLButtonElement;

let searchPokemon: number = 1;

const fetchPokemon = async (pokemon: string) => {
   const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

   if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
   }
}

const renderPokemon = async (pokemon: string) => {

   pokemonName.innerHTML = 'Loading...';
   pokemonNumber.innerHTML = '';
   const data = await fetchPokemon(pokemon);

   if (data) {
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

      input.value = '';
      searchPokemon = data.id;
   } else {
      pokemonImage.src = '#'
      pokemonName.innerHTML = 'Not Found =/';
      pokemonNumber.innerHTML = '';
   }
}

form.addEventListener('submit', (event) => {
   event.preventDefault();
   renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
   if (searchPokemon > 1) {
      searchPokemon--;
      renderPokemon(searchPokemon.toString());
   }
});

buttonNext.addEventListener('click', () => {
   searchPokemon++;
   renderPokemon(searchPokemon.toString());
});

renderPokemon(searchPokemon.toString());