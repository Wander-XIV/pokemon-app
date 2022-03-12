// IIFE
let pokemonRepository = (function () {
  let pokemonList = [{
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    type: ['fire']
},

{
  name: 'Bulbasaur',
  height: 0.7,
  weight: 6.9,
  type: ['grass', ' poison']
},

{
  name: 'Squirtle',
  height: 0.5,
  weight: 9,
  type: ['water']
},

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

pokemonRepository.getAll().forEach(function(pokemon){
  document.write(pokemon.name + ": height: "+ pokemon.height + ", weight: "+ pokemon.weight + ", type: "+ pokemon.type);
  document.write ("<br/>");
});

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Dragonite' });
console.log(pokemonRepository.getAll());
