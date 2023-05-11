// Fetch data from json file
fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    // Get the card element
    const card = document.querySelector('.card');

    // Create a card for each character - to be changed so that character card
        //appears for searched characters only, not appearing by default
    data.forEach(character => {
    
      // Set the image source
      newCard.querySelector('.card-img-top').src = character.images.md;

      // The character description/text
      newCard.querySelector('.card-name').textContent = character.name;

      // Add the new card to the page
      document.body.appendChild(newCard);
    });
  })
  .catch(error => console.error(error));

