let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}); 

//--------------Start of Code----------------//


//target the div element to append to
//make a get request
//use response data to make a div
//append div to parent div

//variables
const toysDiv = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector("#toy-collection")


//Get Network Request
fetch("http://localhost:3000/toys")
.then(response=>response.json())
.then(toys=>{
  console.log(toys)
  toys.forEach( toy => {renderToy(toy)} )
})

// get the form element, listen for a submit event on it, 
// capture the data inside, send a post request using fetch
// render the toy!!

//Form Event listener and POST request
toyForm.addEventListener("submit", function(event){
  event.preventDefault()
  const newToy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

fetch("http://localhost:3000/toys", {
  method: 'POST',
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify(newToy)
})
.then(response =>response.json())
.then(newToy =>{
  renderToy(newToy)
})

})

// target like button
//add event listener for click
//make patch request with updated like + 1
//increase like by one on DOM

//Like event listener and PATCH request
toyCollection.addEventListener("click", function(event) {
  // debugger
  console.log(event.target)
  const likesP = event.target.closest(".card").querySelector("p")
  // debugger
  let likesCount = parseInt(likesP.textContent)
  const toyId = parseInt(event.target.closest(".card").dataset.id)
  if (event.target.matches("button.like-btn")){  
  let newCount = likesCount + 1
  //debugger 
  likesP.textContent = `${newCount} Likes`
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      likes: likesCount + 1
    })
  })
  .then(response => response.json())
  .then(updatedLikes => {
    console.log(updatedLikes.likes)

  })
}
})

//Render to Toy
function renderToy(toy){
  const toyDiv = document.createElement("div")
  toyDiv.innerHTML = `
  <div class="card" data-id="${toy.id}">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Likes</button>
  </div>
  `
  toysDiv.append(toyDiv)
}