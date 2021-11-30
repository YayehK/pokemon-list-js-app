/*This project is to build a Pokédex application that displays a list of Pokémon and
allows the user to view details for each of them*/
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
  // The following loop will write the name and height of all Pokemons on website DOM
  // The else loop checks if the height is above a 1.0 (big) value

  for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height < 1.0) {
      document.write(pokemonList[i].name + '(height:  '+ pokemonList[i].height +')' +'<br>');
    } else {
      document.write(pokemonList[i].name + '(height:  '+ pokemonList[i].height +')' + " - Wow, that's big!" +'<br>');
    }
  }
