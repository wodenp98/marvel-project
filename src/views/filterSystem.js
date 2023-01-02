function handleClickFilter() {
  const buttonFilter = document.querySelectorAll(".container-button");
  console.log(heros);
  let isClicked = false;

  buttonFilter.forEach((button) =>
    button.addEventListener("click", (e) => {
      if (isClicked === false) {
        console.log(button);
        isClicked = true;
        const test = button.children[0];

        button.classList.remove("container-button");
        test.classList.remove(`disabled-${button.title.toLowerCase()}`);
      } else {
        isClicked = false;

        const test = button.children[0];

        button.classList.add("container-button");
        test.classList.add(`disabled-${button.title.toLowerCase()}`);
      }
    })
  );
}
