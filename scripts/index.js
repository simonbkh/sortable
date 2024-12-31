let data = []
let select = document.querySelector('select')
let search = document.querySelector('input')
let tbody = document.querySelector('tbody')

async function init() {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    //err
    data = await response.json()
    displayHeroes()

}
const displayHeroes = (page = 1) => {
    // const heroesOnPage = Array.from(document.getElementsByTagName('tr'))
   
    tbody.innerHTML = ""
    const obj = getParams()
    //search 
    let  filteredData = data.filter((ele) => {
        let n = ele["name"];
        return n.includes(obj.searchResult);
    });

    const start = (obj.heroesCount * obj.pageNumber) - obj.heroesCount
    const end = obj.heroesCount * obj.pageNumber
    for (let i = start; i < end || data.length ; i++) {
        if (i=== filteredData.length -2 ) {
            break
        }
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td><img src="${filteredData[i].images.xs}"><src></td>
        <td>${filteredData[i].name}</td>
        <td>${filteredData[i].biography.fullName}</td>
        <td> <pre>${Object.entries(filteredData[i].powerstats).map(([key, value]) => `${key}: ${value}`).join('\n')}</pre></td>
        <td>${filteredData[i].appearance.race}</td>
        <td>${filteredData[i].appearance.gender}</td>
        <td>${filteredData[i].appearance.height}</td>
        <td>${filteredData[i].appearance.weight}</td>
        <td>${filteredData[i].biography.placeOfBirth}</td>
        <td>${filteredData[i].biography.alignment}</td>`
      
        tbody.appendChild(tr)

    }

}

select.addEventListener('click', displayHeroes)
search.addEventListener('keyup', displayHeroes)

const getParams = () => {
    const elements = Array.from(document.querySelectorAll('[data-input]'));

    const searchResult = elements[0]?.value.trim() || ''
    const heroesCount = parseInt(elements[1].value) || data.length
    const pageNumber = parseInt(elements[2]?.value) || 1

    return { searchResult, heroesCount, pageNumber }
}
addEventListener('DOMContentLoaded', init)