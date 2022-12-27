const csSelect = document.getElementById("cs-select")

function displayCs(data) {
    const dataMap = data.map((item) => item.cs);
    let array
    array = [...new Set(dataMap)]
    
    array.sort((a,b) => a - b)

    array.forEach(element => {
    const option = document.createElement("option")
      option.innerHTML = `${element}`
      csSelect.appendChild(option)
    })

}