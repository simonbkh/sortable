let data = []


const loadData = (heroes) => {
    data = heroes
};

// Request the file with fetch, and the data will be downloaded to your browser cache.
fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then((response) => response.json()) // parse the response from JSON
    .then(loadData); // .then will call the `loadData` function with the JSON value.



export { data }

// const injector = (hero) => {

// }