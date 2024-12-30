import { data } from "scripts/fetch.js";



export const displayHeroes = () => {
     const heroesOnPage = document.getElementsByTagName(tr)
     const arr  = getParams() // gives search data and number to display    and page 

} 



const getParams = () => {
     return Array.from(document.body.querySelectorAll('data-input'))
}