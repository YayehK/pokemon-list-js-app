/*This project is to build a Pokédex application that displays a list of Pokémon and
allows the user to view details for each of them*/
/*let pokemonList = [
{
name: 'Wartortle',
height: 1,
types:['Water']},
{
name: 'Metapod',
height: 0.7,
types:['bug']
},
{
name: 'Charmander',
height: 0.6,
types:['fire']
},
{
name: 'Ghost',
height: 0.5,
types:['ghost']
},
];*/
// The following loop will write the name and height of all Pokemons on website DOM
// The else loop checks if the height is above a 1.0 (big) value

/*  for (let i=0; i<pokemonList.length; i++) {
if (pokemonList[i].height < 1.0) {
document.write('<p>'+pokemonList[i].name + '(height:  '+ pokemonList[i].height +')</p>');
} else {
document.write(pokemonList[i].name + '(height:  '+ pokemonList[i].height +')' + " - Wow, that's big!");
}
}*/
//The following code uses 'forEach' function instead of 'for' loop to iterate the Pokemon in the pokemonList

/*pokemonList.forEach((item) => {
if (item.height < 1.0) {
document.write('<p>'+item.name + '(height:  '+ item.height +')</p>');
} else {
document.write(item.name + '(height:  '+ item.height +')' + " - Wow, that's big!");
}
});
*/

//The following code wraps the array(pokemonList) in an IIFE to avoid accidentally accessing the global state

let pokemonRepository = (function () {
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
// this gets pokemon details using the URL from pokemon object in the parameter!
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
// once the
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
/*
pokemonRepository.add({ name: 'Pikachu', height: 0.4, types:['electric']});
pokemonRepository.add({ name: 'Beedrill', height: 1, types:['bug']});
console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach((pokemon) => {
let pokemonList = document.querySelector('.pokemon-list');
let listItem = document.createElement('li');
let button = document.createElement('button');
button.innerText = pokemon.name;
button.classList.add('button-class');
listItem.appendChild(button);
pokemonList.appendChild(listItem);

pokemonRepository.addListItem(pokemon);

});*/
