"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;
const fetchPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    const APIResponse = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = yield APIResponse.json();
        return data;
    }
});
const renderPokemon = (pokemon) => __awaiter(void 0, void 0, void 0, function* () {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = yield fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }
    else {
        pokemonImage.src = '#';
        pokemonName.innerHTML = 'Not Found =/';
        pokemonNumber.innerHTML = '';
    }
});
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
