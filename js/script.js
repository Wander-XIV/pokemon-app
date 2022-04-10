//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1126";

  //public function
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error("error when validating item", pokemon);
    }
  }

  function filter(name) {
    return pokemonList.filter(pokemonList => pokemonList.name === name);
  }

  function getAll() {
    return pokemonList;
  }

  function findPokemon(searchName) {
    $(".pokemon-list").empty();

    pokemonList.forEach(pokemon => {
      if (
        capitalizeFirstLetter(pokemon.name).indexOf(
          capitalizeFirstLetter(searchName)
        ) > -1
      ) {
        addListItem(pokemon);
      }
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("div");
    pokemonListItem.classList.add("group-list-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-pokemon", "btn");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");
    pokemonRepository.handleButtonClick(button, pokemon);
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + capitalizeFirstLetter(item.name) + "</h1>");

    let idElement = $("<h2>" + "ID: " + item.id + "</h2>");

    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imgUrl);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imgUrlBack);

    let heightElement = $("<p>" + "Height: " + item.height + "</p>");

    let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");

    let typeElement = $(
      "<p>" + "Types: " + item.types.map(i => i.type.name).join(", ") + "</p>"
    );

    let abilityElement = $(
      "<p>" +
        "Abilities: " +
        item.abilities.map(i => i.ability.name).join(", ") +
        "</p>"
    );

    modalBody.append(idElement);
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);
  }

  function handleButtonClick(button, pokemon) {
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: capitalizeFirstLetter(item.name),
            detailsUrl: item.url
          };
          add(pokemon);
          hideLoadingMessage();
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.id = details.id;
        item.imgUrl = details.sprites.front_default;
        item.imgUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;

        hideLoadingMessage();
      })
      .catch(function(e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showLoadingMessage() {
    const loadingMessage = document.getElementById("loading_message");
    loadingMessage.removeAttribute("style", "display:none");
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById("loading_message");
    loadingMessage.setAttribute("style", "display:none");
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    add: add,
    filter: filter,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    handleButtonClick: handleButtonClick,
    loadList: loadList,
    loadDetails: loadDetails,
    findPokemon: findPokemon
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
