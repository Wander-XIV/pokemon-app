// IIFE
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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1) {
    document.write(
      pokemonList[i].name +
        "<br>Height : (" +
        pokemonList[i].height +
        ")" +
        " Wow that's big!<br>" +
        "Weight : (" +
        pokemonList[i].weight +
        ")<br>" +
        "Type : (" +
        pokemonList[i].type +
        ")<br>"
    );
  } else {
    document.write(
      pokemonList[i].name +
        "<br>Height : (" +
        pokemonList[i].height +
        ")<br>" +
        "Weight : (" +
        pokemonList[i].weight +
        ")<br>" +
        "Type : (" +
        pokemonList[i].type +
        ")<br>"
    );
  }
}
