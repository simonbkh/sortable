let data = []
let select = document.querySelector('select')
let search = document.querySelector('input')
let tbody = document.querySelector('tbody')

// let mok = document.querySelector('select')
// mok.addEventListener('click', displayHeroes)

async function init() {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    //err
    data = await response.json()
    displayHeroes()

}
const displayHeroes = (page = 1) => {
    const heroesOnPage = document.getElementsByTagName('tr')
    const obj = getParams()
    const start = (obj.heroesCount * obj.pageNumber) - obj.heroesCount
    const end = obj.heroesCount * obj.pageNumber
    console.log(data[0].powerstats);
    
    for (let i = start; i < end; i++) {
        const tr = document.createElement('tr') 
        tr.innerHTML = `
        <td><img src="${data[i].images.xs}"><src></td>
        <td>${data[i].name}</td>
        <td>${data[i].biography.fullName }</td>
        <td>${data[i].name}</td>
        <td>${data[i].appearance.race}</td>
        <td>${data[i].appearance.gender}</td>
        <td>${data[i].appearance.height}</td>
        <td>${data[i].appearance.weight}</td>
        <td>${data[i].biography.placeOfBirth}</td>
        <td>${data[i].biography.alignment}</td>`
        
        tbody.appendChild(tr)

    }

}

select.addEventListener('click', displayHeroes)
search.addEventListener('keydown', displayHeroes)

// mok.addEventListener('click', (num) => {
//   v = parseInt(num.target.value)
// })
// gives search data and number to display    and page 
const getParams = () => {
    const elements = Array.from(document.querySelectorAll('[data-input]'));
    // console.log(elements);


    const searchResult = elements[0]?.value.trim() || ''
    const heroesCount = parseInt(elements[1].value) || data.length
    const pageNumber = parseInt(elements[2]?.value) || 1

    return { searchResult, heroesCount, pageNumber }
}
addEventListener('DOMContentLoaded', init)