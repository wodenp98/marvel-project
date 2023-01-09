function handleClickClassFilter() {
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

function handleClickStarsFilter() {
  const buttonsStars = document.querySelectorAll(".stars-button");
  isClicked = false;
  buttonsStars.forEach((button) =>
    button.addEventListener("click", () => {
      if (isClicked === false) {
        displayHeroes(heros);
        button.style.backgroundColor = "rgba(221,221,221)";
        return (isClicked = true);
      } else {
        let test = Number(button.title);
        sortByStars(test);
        button.style.backgroundColor = "rgba(33, 33, 33, 0.9)";
        return (isClicked = false);
      }
    })
  );
}

function handleClickRankFilter() {
  const buttonRank = document.querySelectorAll(".rank-button");
  isClicked = false;

  buttonRank.forEach((button) =>
    button.addEventListener("click", () => {
      if (isClicked === false) {
        let number = Number(button.textContent);
        button.style.background = "rgb(33, 33, 33, 0.9)";
        button.style.color = "rgb(221,221,221)";
        sortByRank(number);
        return (isClicked = true);
      } else {
        button.style.background = "rgb(221,221,221)";
        button.style.color = "rgb(33, 33, 33, 0.9)";
        displayHeroes(heros);
        return (isClicked = false);
      }
    })
  );
}

function handleClickImmunityFilter() {
  const buttonImmunity = document.querySelectorAll(".container-immunity");
  let isClicked = false;
  const containerClass = "container-button";
  const backgroundClass = "background-button";

  buttonImmunity.forEach((button) =>
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

        sortByImmunity();
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

function sortByStars(number) {
  let filteredList = heros.filter(function (hero) {
    return hero.stars === number;
  });

  displayHeroes(filteredList);
}

function sortByRank(number) {
  let filteredList = heros.filter(function (hero) {
    return hero.rank === number;
  });

  displayHeroes(filteredList);
}

function sortByImmunity() {
  let filteredList = heros.filter(function (hero) {
    console.log(hero.immunity);
  });
  displayHeroes(filteredList);
}
