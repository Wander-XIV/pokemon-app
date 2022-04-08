// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  let loadingElement = document.getElementById("loading-state");
  let modalContainer = document.querySelector("#modal-container");

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  //fetch data from the API and adds each pokemon in the fetched data to the pokemonList.
  function loadList() {
    loadingElement.classList.add("shown");
    return fetch(apiUrl)
      .then(function(response) {
        loadingElement.classList.remove("shown");
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        loadingElement.classList.remove("shown");
        console.error(e);
      });
  }
  // Gets data from item url

  //loads pokemon details
  function loadDetails(item) {
    loadingElement.classList.add("shown");
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        loadingElement.classList.remove("shown");
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function(e) {
        loadingElement.classList.remove("shown");
        console.error(e);
      });
  }

  // Shows details in console form load function
  function showDetails(item) {
    loadDetails(item).then(function() {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = " ";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    let weightElement = document.createElement("p");
    weightElement.innerText = "Weight: " + pokemon.weight;

    let typeElement = document.createElement("p");
    pokemon.types.forEach((type, index) => {
      if (index === pokemon.types.length - 1) {
        typeElement.innerText += type.type.name;
      } else {
        typeElement.innerText += "Type: " + type.type.name + ", ";
      }
    });

    let imageElement = document.createElement("img");
    imageElement.classList.add("image-class");
    imageElement.setAttribute("src", pokemon.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typeElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", e => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
//IIFE end

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
