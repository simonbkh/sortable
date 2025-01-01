import { getParams } from "./tools.js"
import { data } from "./superheroes.js"

let select = document.querySelector('select')
let search = document.querySelector('input')
let tbody = document.querySelector('tbody')

export const displayHeroes = () => {
    tbody.innerHTML = ""
    const obj = getParams()

    //search 
    const filtereddata = data.filter((ele) => {
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
search.addEventListener('keydown', displayHeroes)