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
  let pokemonList = [
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
    ];

    function getAll(){
      return pokemonList;
    }

    function add(item){
      if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
        pokemonList.push(item);
      }
    }

    return {
      getAll: getAll,
      add: add
    };

  })();

  pokemonRepository.add({ name: 'Pikachu', height: 0.4, types:['electric']});
  /*console.log(pokemonRepository.getAll());*/
  pokemonRepository.getAll().forEach((item) => {
    if (item.height < 1.0) {
      document.write('<p>'+item.name + '(height:  '+ item.height +')</p>');
    } else {
      document.write(item.name + '(height:  '+ item.height +')' + " - Wow, that's big!");
    }
  });
