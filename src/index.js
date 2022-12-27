let heros = []

async function getHeroes() {
    try {
        const heroesFetch = await fetch("/data/champions.json")
        const dataHeros = await heroesFetch.json()
        return dataHeros.champions

    } catch (error) {
        console.log(error)
    }
}

async function displayHeroes(heros) {
    const herosSection = document.getElementById("section-heroes")
    herosSection.innerHTML = ""

    heros.forEach(hero => {
        const heroModel = heroFactory(hero)
        const heroCardDom = heroModel.getHeroCardDom()
        herosSection.appendChild(heroCardDom)
    });
}

async function init() {
    heros = await getHeroes();
    displayImmunity(heros)
    displayCs(heros)
    displayHeroes(heros)
}

init()