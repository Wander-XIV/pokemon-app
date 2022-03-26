// IIFE
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: "Charmander",
      height: 0.6,
      weight: 8.5,
      type: ["fire"]
    },

    {
      name: "Venusaur",
      height: 6.07,
      weight: 220.5,
      type: ["grass", " poison"]
    },

    {
      name: "Squirtle",
      height: 0.5,
      weight: 9,
      type: ["water"]
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addListener(button, pokemon) {
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addListener(button, pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 0.3,
  weight: 13.2,
  types: ["electric"]
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
