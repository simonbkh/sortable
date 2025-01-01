import { data, sortDirection } from "./superheroes.js"
import { averagePowerStats } from "./tools.js"

export const sortData = (column) => {
    const isAscending = sortDirection === 'A'

    data.sort((a, b) => {
        let valueA, valueB
        switch (column) {
            case 'name':
                valueA = a.name; valueB = b.name
                break
            case 'fName':
                valueA = a.biography.fullName; valueB = b.biography.fullName
                break
            case 'race':
                valueA = a.appearance.race; valueB = b.appearance.race
                break
            case 'gender':
                valueA = a.appearance.gender; valueB = b.appearance.gender
                break
            case 'height':
                valueA = parseInt(a.appearance.height[0].replace(/\D/g, '') || 0); valueB = parseInt(b.appearance.height[0].replace(/\D/g, '') || 0)
                break
            case 'weight':
                valueA = parseInt(a.appearance.weight[0].replace(/\D/g, '') || 0); valueB = parseInt(b.appearance.weight[0].replace(/\D/g, '') || 0)
                break
            case 'pStats':
                valueA = averagePowerStats(a.powerstats); valueB = averagePowerStats(b.powerstats)
                break
            case 'pBirth':
                valueA = a.biography.placeOfBirth; valueB = b.biography.placeOfBirth
                break
            case 'align':
                valueA = a.biography.alignment; valueB = b.biography.alignment
                break
            default:
                valueA = valueB = 'n/a'
        }

    //this part needs review
        if (valueA === 'n/a') return 1
        if (valueB === 'n/a') return -1

        if (valueA > valueB) return isAscending ? 1 : -1
        if (valueA < valueB) return isAscending ? -1 : 1
        return 0
    })
}