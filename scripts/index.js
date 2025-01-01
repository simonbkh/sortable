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
    const start = (obj.heroesCount * page) - obj.heroesCount < filtereddata.length ? (obj.heroesCount * page) - obj.heroesCount : 0
    const end = obj.heroesCount * page <= filtereddata.length - 1 ? obj.heroesCount * page : filtereddata.length
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
const getParams = () => {
    const elements = Array.from(document.querySelectorAll('[data-input]'))

    const searchResult = elements[0]?.value.toLowerCase().trim() || ''
    const heroesCount = parseInt(elements[1].value) || data.length
    const pageNumber = parseInt(elements[2].innerText) || 1

    return { searchResult, heroesCount, pageNumber }
}
const updatePageAndDisplay = (page) => {
    const elements = document.querySelectorAll('[data-input]');
    elements[2].innerText = page;
    displayHeroes(page);
}

select.addEventListener('click', () => updatePageAndDisplay(1))
search.addEventListener('keyup', () => updatePageAndDisplay(1))
pageDown.addEventListener('click', () => {
    const currentPage = getParams().pageNumber;
    const newPage = Math.max(1, currentPage - 1);
    updatePageAndDisplay(newPage);
})

pageUp.addEventListener('click', () => {
    const currentPage = getParams().pageNumber;
    const newPage = Math.min(Math.ceil(filtereddata.length / getParams().heroesCount), currentPage + 1);
    updatePageAndDisplay(newPage);
})

addEventListener('DOMContentLoaded', init)