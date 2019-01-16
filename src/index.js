document.addEventListener('DOMContentLoaded', () => {

})
//tools
s = function(select){return document.querySelector(select)}
c = function(tagName){return document.createElement(tagName)} 
//HTML
let tableBody = s("#table-body")
let selectedDog = null
//edit form
let nameInput = s('#name-input')
let breedInput = s('#breed-input')
let sexInput = s('#sex-input')
// let idInput = s('#id-input')
let submitButton = s('#submit-button')
//render
function render(){
    tableBody.innerText = ''
    dogs.forEach(function(dog){
        row = c('tr')
        nameCell = c('td')
        breedCell = c('td')
        sexCell = c('td')
        editCell = c('td')
        editButton = c('button')
        editButton.innerText = 'edit'
        editCell.append(editButton)
        nameCell.innerText = dog.name
        breedCell.innerText = dog.breed
        sexCell.innerText = dog.sex
        row.append(nameCell, breedCell, sexCell, editCell)
        tableBody.append(row)
        editButton.addEventListener('click', function(){
            selectedDog = dog
            // idInput.value = dog.id
            nameInput.value = dog.name
            breedInput.value = dog.breed
            sexInput.value = dog.sex
        })
            //set inputs to dog attributes
            //patch request that assigns dog values to inputs
            //renders
    })
}

submitButton.addEventListener('click', function(e){
    e.preventDefault()
    selectedDog.name = nameInput.value
    selectedDog.breed = breedInput.value
    selectedDog.sex = sexInput.value
    fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(selectedDog)
    })
    render()
})



//fetch
let dogs = []
fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(res => dogs = res)
    .then(render)

