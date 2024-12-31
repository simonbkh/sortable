let data = []
let select = document.querySelector('select')
let search = document.querySelector('input')
// let mok = document.querySelector('select')
// mok.addEventListener('click', displayHeroes)

async function init() {
    const response = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    
    data = await response.json()
    displayHeroes()
    
}
const displayHeroes = (page = 1) => {
    const heroesOnPage = document.getElementsByTagName('tr')
    const obj = getParams()      
    console.log(obj);
      
    for (let i = 0; i < obj.heroesCount; i++) {
        
    }
    
}

select.addEventListener('click', displayHeroes)
search.addEventListener('keyup', displayHeroes)

// mok.addEventListener('click', (num) => {
//   v = parseInt(num.target.value)
// })
// gives search data and number to display    and page 
const getParams = () => {
    const elements = Array.from(document.querySelectorAll('[data-input]'));
    // console.log(elements);
    
    
    const searchResult = elements[0]?.value.trim() || '';
    const heroesCount = parseInt(elements[1].value) || data.length;
    const pageNumber = parseInt(elements[2]?.value) || 1;

    return { searchResult, heroesCount, pageNumber };
}
// console.log(data);
addEventListener('DOMContentLoaded', init)