import { sortData } from "./sort.js"
import { displayHeroes } from "./display.js"


export let data = []
export let sortDirection = 'A'
let sortColumn = 'name'

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
            height: value.appearance.height.map(h => (h === '-' || h === '0 cm') ? 'n/a' : h),
            weight: value.appearance.weight.map(w => (w === '- lb' || w === '0 kg') ? 'n/a' : w),
        },
        powerstats: Object.fromEntries(
            Object.entries(value.powerstats).map(([key, value]) => [key, value ?? 'n/a'])
        ),
    }))

    displayHeroes()
    addSortEventListeners()
}

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
