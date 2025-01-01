// import { data } from "./display.js"
import { data, sortDirection } from "./superheroes.js"
import { averagePowerStats } from "./tools.js"

export const sortData = (column) => {
    const isAscending = sortDirection === 'A'

    console.log(typeof column)
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
        // handle missing data
        if ((valueA === 'n/a' || valueB === 'n/a') || (valueA == ['n/a', 'n/a'] || valueB == ['n/a', 'n/a']) ) {
            return valueA === 'n/a' ? (valueB === 'n/a' ? 0 : 1) : -1;
        }

        return (valueA > valueB ? 1 : valueA < valueB ? -1 : 0) * (isAscending ? 1 : -1);

    })
}