function search() {
  const searchButton = document.getElementById("search-input");

  searchButton.addEventListener("keyup", (e) => {
    const input = searchButton.value.toLowerCase();
    let research = heros.filter((hero) => {
      return hero.name.toLowerCase().includes(input);
    });
    displayHeroes(research);
  });
}
