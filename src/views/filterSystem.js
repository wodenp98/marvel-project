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

        sortByImmunity(button.title);
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

function handleClickCsFilter() {
  const selectButton = document.getElementById("cs-select");

  selectButton.addEventListener("change", (e) => {
    let number = Number(e.target.value);
    sortByCs(number);
  });
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

function sortByImmunity(type) {
  let elementSort = `${type}`;
  let heroImmunity = heros.filter((hero) => hero.immunity);

  heroImmunity.sort((a, b) => {
    let indexA = a.immunity.indexOf(elementSort);
    let indexB = b.immunity.indexOf(elementSort);
    return indexA - indexB;
  });

  let filteredList = heroImmunity.filter((obj) =>
    obj.immunity.includes(elementSort)
  );

  filteredList.sort((a, b) => (a.indice < b.indice ? 1 : -1));
  displayHeroes(filteredList);
}

function sortByCs(number) {
  let filteredList = heros.filter(function (hero) {
    return hero.cs === number;
  });
  displayHeroes(filteredList);
}
