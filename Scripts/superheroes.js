import { sortData } from "./sort.js"
import { getParams } from "./tools.js"

export let data = []
export let filtredData = data

export let sortDirection = 'A'
let sortColumn = 'name'
let tbody = document.querySelector('tbody')

let select = document.querySelector('select')
let search = document.querySelector('input')
let pageDown = document.querySelector('.prevButton')
let pageUp = document.querySelector('.nextButton')


async function init() {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    data = await response.json()

    //this part needs review
    data = data.map(value => ({
        ...value,
        name: value.name === '-' ? "n/a" : value.name,
        biography: {
            ...value.biography,
            fullName: value.biography.fullName === '' ? "n/a" : value.biography.fullName,
            placeOfBirth: value.biography.placeOfBirth === '-' ? "n/a" : value.biography.placeOfBirth,
            alignment: value.biography.alignment === '-' ? "n/a" : value.biography.alignment,
        },
        appearance: {
            ...value.appearance,
            race: value.appearance.race === '-' ? "n/a" : value.appearance.race,
            gender: value.appearance.gender === '-' ? "n/a" : value.appearance.gender,
            height: value.appearance.height.map(h => h),
            weight: value.appearance.weight.map(w => w),
        },
        powerstats: Object.fromEntries(
            Object.entries(value.powerstats).map(([key, value]) => [key, value ?? 'n/a'])
        ),
    }))

    displayHeroes()
    addSortEventListeners()
}

export const displayHeroes = (page = 1) => {

    tbody.innerHTML = ""
    const obj = getParams()

    //search 
    filtredData = data.filter((ele) => {
        let n = ele["name"];
        return n.toLowerCase().includes(obj.searchResult);
    });
    const start = (obj.heroesCount * page) - obj.heroesCount < filtredData.length ? (obj.heroesCount * page) - obj.heroesCount : 0
    const end = obj.heroesCount * page <= filtredData.length - 1 ? obj.heroesCount * page : filtredData.length
    // console.log(data,obj, start, end)
    for (let i = start; i < end; i++) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td><img src="${filtredData[i].images.xs}"><src></td>
        <td>${filtredData[i].name}</td>
        <td>${filtredData[i].biography.fullName}</td>
        <td> <pre>${Object.entries(filtredData[i].powerstats).map(([key, value]) => `${key}: ${value}`).join('\n')}</pre></td>
        <td>${filtredData[i].appearance.race}</td>
        <td>${filtredData[i].appearance.gender}</td>
        <td>${filtredData[i].appearance.height}</td>
        <td>${filtredData[i].appearance.weight}</td>
        <td>${filtredData[i].biography.placeOfBirth}</td>
        <td>${filtredData[i].biography.alignment}</td>`

        tbody.appendChild(tr)

    }

}

const updatePageAndDisplay = (page) => {
    const elements = document.querySelectorAll('[data-input]')
    elements[2].innerText = page
    displayHeroes(page)
}

select.addEventListener('click', () => updatePageAndDisplay(1))
search.addEventListener('keyup', () => updatePageAndDisplay(1))
pageDown.addEventListener('click', () => {
    const currentPage = getParams().pageNumber
    const newPage = Math.max(1, currentPage - 1)
    updatePageAndDisplay(newPage)
})

pageUp.addEventListener('click', () => {
    const currentPage = getParams().pageNumber
    const newPage = Math.min(Math.ceil(filtredData.length / getParams().heroesCount), currentPage + 1)
    updatePageAndDisplay(newPage)
})

const addSortEventListeners = () => {
    const headers = document.querySelectorAll('thead th')
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.id
            if (sortColumn === column) {
                sortDirection = sortDirection === 'A' ? 'D' : 'A'
            } else {
                sortColumn = column
                sortDirection = 'A'
            }
            sortData(sortColumn)
            displayHeroes()
        })
    })
}

addEventListener('DOMContentLoaded', init)
