import { getParams } from "./tools.js"
import { data } from "./superheroes.js"

let select = document.querySelector('select')
let search = document.querySelector('input')
let tbody = document.querySelector('tbody')

export const displayHeroes = () => {
    const obj = getParams()
    const start = (obj.heroesCount * obj.pageNumber) - obj.heroesCount
    const end = obj.heroesCount * obj.pageNumber

    tbody.innerHTML = ''
    for (let i = start; i < end; i++) {
        const tr = document.createElement('tr') 
        tr.innerHTML = `
        <td><img src="${data[i].images.xs}"><src></td>
        <td>${data[i].name}</td>
        <td>${data[i].biography.fullName }</td>
        <td> <pre>${Object.entries(data[i].powerstats).map(([key, value]) => `${key}: ${value}`).join('\n')}</pre></td>
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