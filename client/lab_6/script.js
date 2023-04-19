/* eslint-disable max-len */

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str
});
  /*
  ## JS and HTML Injection
    There are a bunch of methods to inject text or HTML into a document using JS
    Mainly, they're considered "unsafe" because they can spoof a page pretty easily
    But they're useful for starting to understand how websites work
    the usual ones are element.innerText and element.innerHTML
    Here's an article on the differences if you want to know more:
    https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext

  ## What to do in this function
    - Accept a list of restaurant objects
    - using a .forEach method, inject a list element into your index.html for every element in the list
    - Display the name of that restaurant and what category of food it is
*/
}

function processRestaurants(list) {
  console.log('fired restaurants list');
  const range = [...Array(15)];
  return newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length -1);
    return list[index]
  })

  /*
    ## Process Data Separately From Injecting It
      This function should accept your 1,000 records
      then select 15 random records
      and return an object containing only the restaurant's name, category, and geocoded location
      So we can inject them using the HTML injection function

      You can find the column names by carefully looking at your single returned record
      https://data.princegeorgescountymd.gov/Health/Food-Inspection/umjn-t2iz

    ## What to do in this function:

    - Create an array of 15 empty elements (there are a lot of fun ways to do this, and also very basic ways)
    - using a .map function on that range,
    - Make a list of 15 random restaurants from your list of 100 from your data request
    - Return only their name, category, and location
    - Return the new list of 15 restaurants so we can work on it separately in the HTML injector
  */
}

function filterList(list, query) {
  return list.filter((item) =>{
  const lowerCaseName = item.name.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();
  return lowerCaseName.includes(lowerCaseQuery);
  })
}

async function mainEvent() { // the async keyword means we can make APv bfxbI requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector('.filter_button');
  const loadDataButton = document.querySelector('#data_load');
  const generateListButton = document.querySelector('.generate');

  const loadAnimation = document.querySelector('#data_load_animation');
  loadAnimation.style.display = 'none';
  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
    console.log('loading data'); 
    loadAnimation.style.display = 'inline-block';

    // Basic GET request - this replaces the form Action
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();
    loadAnimation.style.display ='none';
    console.table(currentList); 
  });


  filterButton.addEventListener('click', (event)=> {
    console.log('clicked FilterButton');

    const formData= new FormData(mainForm);
    const formProps= Object.fromEntries(formData);

    console.log(formProps);
    const newList = filterList(currentList, formProps.resto);

    console.log(newList);
    injectHTML(newList)
  })


  generateListButton.addEventListener('click', (event) => {
    console.log('generate new list')
    const restaurantsList = processRestaurants(currentList);
    injectHTML(restaurantsList);
})

}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
