import { data } from "scripts/fetch.js";



export const displayHeroes = () => {
     const heroesOnPage = document.getElementsByTagName(tr)
     obj = getParams() // gives search data and number to display    and page 




} 



const getParams = () => {
     const elements = Array.from(document.querySelectorAll('.data-input'));
 
     const searchResult = elements[0]?.textContent.trim() || ''; 
     const heroesCount = parseInt(elements[1]?.textContent.trim()) || 20; 
     const pageNumber = parseInt(elements[2]?.textContent.trim()) || 1; 
 
     return { searchResult, heroesCount, pageNumber };
 };