/*This project is to build a Pokédex application that displays a list of Pokémon and
allows the user to view details for each of them*/

//The following code wraps the array(pokemonList) in an IIFE to avoid accidentally accessing the global state

//IIFE starts here

let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#exampleModal');
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(item) {
    if (typeof item === 'object' &&  'name' in item) {
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
    let pokemonImg = document.createElement('img');

    button.innerText = pokemon.name;
    button.classList.add('button');
    button.classList.add('btn');
    pokemonImg.classList.add('btn-img');
  /*button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');*/
    button.appendChild(pokemonImg);
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //adds event listener to the buttons
    button.addEventListener('click', function (){
      showDetails(pokemon, modalContainer);
    });

    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      pokemon.image = details.sprites.front_default;
      pokemonImg.setAttribute ('src', pokemon.image);
    }).catch(function(e){
      console.error(e);
    });
  }
  // loads data from an external source
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
      item.weight = details.weight;
      /*item.types = details.types.type.name;
      item.abilities = details.abilities.ability.name;*/

    }).catch(function (e) {
      console.error(e);
    });
  }
  // once the details are loaded, this funtion shows details for selected data
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

  // adds modal to Pokemon app.
  function showModal(pokemon){
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1 class="text-capitalize">' + pokemon.name + '</h1>');
    let imageElement = $('<img class="modal-img" style="width:30%">');
    imageElement.attr("src", pokemon.imageUrl);

    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
    /*let typesElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');*/

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
/*  modalBody.append(typesElement);
    modalBody.append(abilitiesElement);*/

    $('#exampleModal').modal();
  }

// adds search element to the page
$(document).ready(function(){
  $("#search-pokemon").on("input", function() {
    var value = $(this).val().toLowerCase();
    $(".btn").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal
};
})();

// IIFE ends here

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
