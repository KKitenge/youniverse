let container = document.querySelector(".container")
let loadMoreBtn = document.querySelector("#load_more")

// Fetch data from json file
async function fetchCharacters() {
  const res = await fetch("characters.json")
  const data = await res.json()

  // Create a card for each character
  data.splice(0, 6).forEach(character => {
    //let x = 0
    //x += 5 // x = x(old) + 5
    container.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${character.images.md}" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-name">${character.name}</h5>
                <p class="card-fullName">${character.biography.fullName}</p>
                <p class="card-placeOfBirth">${character.biography.placeOfBirth}</p>
                <p class="card-race">${character.appearance.race}</p>
                <p class="card-gender">${character.appearance.gender}</p>
                <p class="card-alignment">${character.biography.alignment.toUpperCase()}</p>
                <button class="favorite-button">Add to favorites</button>
            </div>
        </div>
        `})
}
fetchCharacters()

loadMoreBtn.addEventListener("click", () => {

})

// Autocomplete bar
//Load names from json file, too hard otherwise
$(function () {
  $.getJSON("characters.json", function (characters) {
    $("#characters").autocomplete({
      source: characters.map(function (character) {
        return character.name;
      })
    });
  });
});

//   $(function() {
//     var availableCharacters = [
//     ];
//     $("#characters").autocomplete({
//       source: availableCharacters
//     });
//   });
