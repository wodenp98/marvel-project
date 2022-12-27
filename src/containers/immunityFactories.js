const immunitySelect = document.getElementById("immunity-select");

function displayImmunity(data) {
  const dataMap = data.map((item) => item.immunity);
  let array = [];
  let arrayConcated = []

    dataMap.forEach((element) => {
    array.push(element);
    let filtered = array.filter((x) => x !== undefined);
    let arrayConcat = [];
    arrayConcated = arrayConcat.concat(...filtered);

    return arrayConcated = [...new Set(arrayConcated)]
    });

    arrayConcated.forEach(item => {

      const option = document.createElement("option")
      option.innerHTML = `${item}`
      immunitySelect.appendChild(option)
    })
}
