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
        name: value.name || 'n/a',
        biography: {
            ...value.biography,
            fullName: value.biography.fullName || 'n/a',
            placeOfBirth: value.biography.placeOfBirth || 'n/a',
            alignment: value.biography.alignment || 'n/a',
        },
        appearance: {
            ...value.appearance,
            race: value.appearance.race || 'n/a',
            gender: value.appearance.gender || 'n/a',
            height: value.appearance.height.map(h => h || 'n/a'),
            weight: value.appearance.weight.map(w => w || 'n/a'),
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
