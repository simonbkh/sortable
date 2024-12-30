// This function is called only after the data has been fetched, and parsed.
const loadData = (heroes) => {
    console.log(heroes);
  };

  fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(
        
        response => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
           return  response.json()
        }
    
    ) 
    .then(loadData)
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
}); 
      