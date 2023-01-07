function handleClickFilter() {
  const buttonFilter = document.querySelectorAll(".container-button");
  let isClicked = false;
  const containerClass = "container-button";
  const backgroundClass = "background-button";

  buttonFilter.forEach((button) =>
    button.addEventListener("click", () => {
      if (isClicked === false) {
        isClicked = true;
        let buttonChildren = button.children[0];

        button.classList.remove(containerClass);
        buttonChildren.classList.remove(
          `disabled-${button.title.toLowerCase()}`
        );

        button.classList.add(backgroundClass);
        buttonChildren.classList.add(`actived-${button.title.toLowerCase()}`);

        sortByClass(button.title);
      } else {
        isClicked = false;
        const buttonChildren = button.children[0];

        button.classList.add(containerClass);
        buttonChildren.classList.add(`disabled-${button.title.toLowerCase()}`);

        button.classList.remove(backgroundClass);
        buttonChildren.classList.remove(
          `actived-${button.title.toLowerCase()}`
        );
        displayHeroes(heros);
        sortHerosByIndice();
      }
    })
  );
}

function sortByClass(type) {
  let filteredList = heros.filter(function (hero) {
    return hero.classHero === `${type}`;
  });

  displayHeroes(filteredList);
}
