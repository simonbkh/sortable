let data = []
let filtereddata = data
let select = document.querySelector('select')
let search = document.querySelector('input')
let tbody = document.querySelector('tbody')
let pageDown = document.querySelector('.prevButton')
let pageUp = document.querySelector('.nextButton')
console.log(pageDown, pageUp);

async function init() {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    //err
    data = await response.json()
    displayHeroes()

}
const displayHeroes = (page = 1) => {

    tbody.innerHTML = ""
    const obj = getParams()

    //search 
    filtereddata = data.filter((ele) => {
        let n = ele["name"];
        return n.toLowerCase().includes(obj.searchResult);
    });
    const start = (obj.heroesCount * obj.pageNumber) - obj.heroesCount < filtereddata.length ? (obj.heroesCount * obj.pageNumber) - obj.heroesCount : 0
    const end = obj.heroesCount * obj.pageNumber <= filtereddata.length - 1 ? obj.heroesCount * obj.pageNumber : filtereddata.length
    // console.log(data,obj, start, end)
    for (let i = start; i < end; i++) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td><img src="${filtereddata[i].images.xs}"><src></td>
        <td>${filtereddata[i].name}</td>
        <td>${filtereddata[i].biography.fullName}</td>
        <td> <pre>${Object.entries(filtereddata[i].powerstats).map(([key, value]) => `${key}: ${value}`).join('\n')}</pre></td>
        <td>${filtereddata[i].appearance.race}</td>
        <td>${filtereddata[i].appearance.gender}</td>
        <td>${filtereddata[i].appearance.height}</td>
        <td>${filtereddata[i].appearance.weight}</td>
        <td>${filtereddata[i].biography.placeOfBirth}</td>
        <td>${filtereddata[i].biography.alignment}</td>`

        tbody.appendChild(tr)

    }

}

select.addEventListener('click', displayHeroes)
search.addEventListener('keyup', displayHeroes)
// pageDown.addEventListener('click', displayHeroes((getParams().pageNumber-1)))
// pageUp.addEventListener('click', displayHeroes(getParams().pageNumber-1))

const getParams = () => {
    const elements = Array.from(document.querySelectorAll('[data-input]'))
    // console.log(elements[2].innerText);

    const searchResult = elements[0]?.value.toLowerCase().trim() || ''
    const heroesCount = parseInt(elements[1].value) || data.length
    const pageNumber = parseInt(elements[2].innerText) || 1

    return { searchResult, heroesCount, pageNumber }
}
addEventListener('DOMContentLoaded', init)