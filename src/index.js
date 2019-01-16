// document.addEventListener('DOMContentLoaded', () => {
// })

// Utilities 
let s = function(selector) {
    return document.querySelector(selector)}

let c = function(tagName) {
    return document.createElement(tagName)}

// HTML Elements 
let tableBody = s('#table-body')
let nameInput = s('#name-input')
let breedInput = s('#breed-input')
let sexInput = s('#sex-input')
let submitButton = s('#submit-button')
// let idInput = s('#dog-id')



// Variables 
let dogs = []
let selectedDog = null
let dogsToDisplay



function render(){
    tableBody.innerHTML = ''

    dogs.forEach(dog =>{
        row = c('tr')
        nameCell = c('td')
        breedCell = c('td')
        sexCell = c('td')
        editButton = c('button')
        nameCell.innerText = dog.name 
        breedCell.innerText = dog.breed 
        sexCell.innerText = dog.sex 
        editButton.innerText = 'Edit'
        editButton.addEventListener('click', function(e){
            e.preventDefault()
            selectedDog = dog 
            nameInput.value = dog.name
            breedInput.value = dog.breed 
            sexInput.value = dog.sex
            // idInput.value = dog.id
        })
        row.append(nameCell, breedCell, sexCell, editButton)
        tableBody.append(row)
    })
}

submitButton.addEventListener('click', (e) =>{
    e.preventDefault()
    selectedDog.name = nameInput.value
    selectedDog.breed = breedInput.value
    selectedDog.sex = sexInput.value   

    fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
    method:'PATCH',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify(selectedDog)
})
render()
})













// Fetch 
fetch("http://localhost:3000/dogs")
.then(res => res.json()) //
.then(res => (dogs = res))
.then(render)
