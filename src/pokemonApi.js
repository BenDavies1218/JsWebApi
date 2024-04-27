async function getPokemonData() {
  let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/";

  let randomPokemonNumber = Math.floor(Math.random() * 1025) + 1;

  let fullApiUrl = pokemonApiUrlBase + randomPokemonNumber;

  let response = await fetch(fullApiUrl);

  let responseData = await response.json();

  let result = responseData;

  // Promise style of fetching data
  // let promiseResponse = await fetch(fullApiUrl).then((elephant) => {
  //   return elephant.json();
  // });

  // result = promiseResponse;

  return result;
}
async function putDataOnPage(dataToDisplay) {
  document.getElementsByClassName("pokemonName")[0].textContent =
    dataToDisplay.name;

  let type1Display = document.getElementsByClassName("pokemonType1")[0];
  let type2Display = document.getElementsByClassName("pokemonType2")[0];

  type1Display.textContent = "Type 1: " + dataToDisplay.types[0].type.name;
  // type1Display.textContent = data.types[0]["type"]["name"];

  if (dataToDisplay.types[1]) {
    // if the data includes a 2nd type, set that as well
    type2Display.textContent = "Type 2: " + dataToDisplay.types[1].type.name;
  } else {
    // if no 2nd type exists, reset the content in type2Display
    type2Display.textContent = "Type 2: ";
  }

  let imageContainer = document.getElementsByClassName("pokemonImage")[0];
  let imageElement = imageContainer.getElementsByTagName("IMG")[0];

  let shinyResult = Math.floor(Math.random() * 4) + 1;

  if (shinyResult == 1) {
    imageElement.src = dataToDisplay.sprites.front_shiny;
    console.log("shiny");
  } else {
    imageElement.src = dataToDisplay.sprites.front_default;
  }

  let cryURL = dataToDisplay.cries.latest;
  let pokemonAudioElement = document.querySelector(".pokemonCry audio");
  pokemonAudioElement.src = cryURL;
  let pokemonAudioPlayButton = document.querySelector(".pokemonCry");
  pokemonAudioPlayButton.addEventListener("click", () => {
    pokemonAudioElement.volume = 0.5;
    pokemonAudioElement.play();
  });
}

//  Button calls this
async function getAndDisplayPokemonData() {
  let data = await getPokemonData();
  console.log(data);

  putDataOnPage(data);
}

document
  .getElementById("create-encounter")
  .addEventListener("click", getAndDisplayPokemonData);
