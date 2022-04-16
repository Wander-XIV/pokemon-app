//IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1126';

  //public function
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error('error when validating item', pokemon);
    }
  }

  function filter(name) {
    return pokemonList.filter(pokemonList => pokemonList.name === name);
  }

  function getAll() {
    return pokemonList;
  }

  function findPokemon(searchName) {
    //jquery syntax
    // Clear all the buttons on the page as user types in the search box
    $('.pokemon-list').empty();

    // Add pokemon buttons for which the typed letters match
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
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('div');
    pokemonListItem.classList.add('group-list-item'); //add bootstrap class
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon', 'btn'); //add class name to button
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    pokemonRepository.handleButtonClick(button, pokemon); //Invoke the function to add event listener
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
  }
  //after click on pokemon button,load the data of pokemon from server
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
      showModal(pokemon);
    });
  }
  //modal to show details of pokemon
  function showModal(item) {
    // create the variables
    //jquery syntax
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // clear existing content
    modalTitle.empty();
    modalBody.empty();

    //create element for name in modal
    let nameElement = $('<h1>' + capitalizeFirstLetter(item.name) + '</h1>');
    // create element for ID in modal
    let idElement = $('<h2>' + 'ID: ' + item.id + '</h2>');
    // create element for image in modal
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imgUrl);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imgUrlBack);
    // create element for height in modal
    let heightElement = $('<p>' + 'Height: ' + item.height * 10 + ' cm</p>');
    // create element for weight in modal
    let weightElement = $('<p>' + 'Weight: ' + item.weight / 10 + ' kg</p>');
    // create element for type in modal
    let typeElement = $(
      '<p>' + 'Types: ' + item.types.map(i => i.type.name).join(', ') + '</p>'
    );
    // create element for abilities in modal
    let abilityElement = $(
      '<p>' +
        'Abilities: ' +
        item.abilities.map(i => i.ability.name).join(', ') +
        '</p>'
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
    //add event listener to the pokemon button
    // eslint-disable-next-line no-unused-vars
    button.addEventListener('click', function(event) {
      //invoke the showdetails function once the button is clicked
      showDetails(pokemon);
    });
  }
  //load list of pokemon from the apiUrl
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
  //load data of each pokemon when clicked on
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        //Now add details to the item
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
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.removeAttribute('style', 'display:none');
  }

  function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading_message');
    loadingMessage.setAttribute('style', 'display:none');
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

//updated forEach loop
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
