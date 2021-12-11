/*This project is to build a Pokédex application that displays a list of Pokémon and
allows the user to view details for each of them*/

//The following code wraps the array(pokemonList) in an IIFE to avoid accidentally accessing the global state

let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(item) {
    if (typeof item === 'object' &&  "name" in item) {
      pokemonList.push(item);
    }else {
      console.log('incorrent Pokemon item');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //adds event listener to the buttons
    button.addEventListener('click', function (){
      showDetails(pokemon);
    });
  }
  // To load data from an external source
  // This fetchs or gets the complete list of pokemon from the link provided!

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  // this loads/gets pokemon details using the URL from pokemon object in the parameter!
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // adding the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  // once the details are loaded, this funtion views details for selected data
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      //  console.log(pokemon.name, pokemon.height, pokemon.img);
      showModal(pokemon);
    });
  }

  // adds modal to Pokemon app.

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    modalContainer.classList.add('is-visible');

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x'; //how to use (&times;) instead of  the leter 'X'??
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.classList.add('img-class');
    imageElement.src = pokemon.imageUrl;


    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

  }
  // removes modal up on close, esk or click outside of modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

// remoces modal with ESC keydown
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

// removes the modal when clicked outside modal
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
