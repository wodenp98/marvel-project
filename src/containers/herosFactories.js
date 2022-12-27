function heroFactory(data)  {
    const { classHero, imageSmall, stars} = data
    let arrays = []
    arrays.push(classHero)

    function getHeroCardDom() {
        const a = document.createElement("a")
        a.classList.add("link-heroes")

        a.innerHTML = `<div class="box-heroes">
                        <div class="placement-heroes">
                            ${arrays.map(array => {
                                if(array === "Mystique") {
                                   return `<div class="background-heroes" style ="background: linear-gradient(rgba(180, 0, 160, 0.7), rgb(10, 0, 20));"></div>`
                                } else if (array === "Mutant") {
                                    return `<div class="background-heroes" style ="background: linear-gradient(rgba(220, 220, 0, 0.7), rgb(10, 0, 20));"></div>`
                                } else if (array === "Science") {
                                    return `<div class="background-heroes" style ="background: linear-gradient(rgba(0, 200, 0, 0.7), rgb(10, 0, 20));"></div>`
                                } else if (array === "Virtuose") {
                                    return `<div class="background-heroes" style ="background: linear-gradient(rgba(200, 0, 0, 0.7), rgb(10, 0, 20));"></div>`
                                } else if (array === "Cosmique") {
                                    return `<div class="background-heroes" style ="background: linear-gradient(rgba(0, 200, 180, 0.7), rgb(10, 0, 20));"></div>`
                                } else {
                                    return `<div class="background-heroes" style ="background: linear-gradient(rgba(0, 60, 200, 0.7), rgb(10, 0, 20));"></div>`
                                }
                            })}
                            <div class="background-heroes"></div>
                            <img src="/assets/border 6.png" class="border-heroes">
                            <div class="image-heroes" style="background-image: url(${imageSmall});"></div>
                        </div>
                    </div>`


        return a
    }

    return {classHero, imageSmall, stars, getHeroCardDom}
}
