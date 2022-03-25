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

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu" });
console.log(pokemonRepository.getAll());

function writeToDomHelper(pokemon) {
  if (pokemon.height > 1) {
    document.write(
      pokemon.name +
        "<br>Height : (" +
        pokemon.height +
        ")" +
        " Wow that's big!<br>" +
        "Weight : (" +
        pokemon.weight +
        ")<br>" +
        "Type : (" +
        pokemon.type +
        ")<br>"
    );
  } else {
    document.write(
      pokemon.name +
        "<br>Height : (" +
        pokemon.height +
        ")<br>" +
        "Weight : (" +
        pokemon.weight +
        ")<br>" +
        "Type : (" +
        pokemon.type +
        ")<br>"
    );
  }
}

pokemonRepository.getAll().forEach(function(pokemon) {
  writeToDomHelper(pokemon);
});
