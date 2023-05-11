// Fetch data from json file
fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    // Get the card element
    const card = document.querySelector('.card');

    // Create a card for each character
    data.forEach(character => {
      // Clone the card element for each character
        //clone gets all characters/cards but this needs to be limited
      const newCard = card.cloneNode(true);

      // Set the image source 
      newCard.querySelector('.card-img-top').src = character.images.md;

      // The character description/text
      newCard.querySelector('.card-name').textContent = character.name;
      newCard.querySelector('.card-fullName').textContent = character.biography.fullName;
      newCard.querySelector('.card-placeOfBirth').textContent = character.biography.placeOfBirth;
      newCard.querySelector('.card-race').textContent = character.appearance.race;
      newCard.querySelector('.card-gender').textContent = character.appearance.gender;
      newCard.querySelector('.card-alignment').textContent = character.biography.alignment.toUpperCase();

      // Add the new card to the page
      document.body.appendChild(newCard);
    });
  })
  .catch(error => console.error(error));