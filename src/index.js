document.addEventListener('DOMContentLoaded', () => {
    let tableBody = document.querySelector('#table-body')
    let editNameInput = document.querySelector(`#dog-form input[name="name"]`)
    let editBreedInput = document.querySelector(`#dog-form input[name="breed"]`)
    let editSexInput = document.querySelector(`#dog-form input[name="sex"]`)
    let submitButton = document.querySelector(`#dog-form input[type="submit"]`)
    let allDogs = []
    let selectedDog = null

    function fetchDogs() {
        fetch('http://localhost:3000/dogs')
        .then(res => res.json() )
        .then(json => {
            allDogs = json
            render()
        })
    }

    function render(){
        listAllDogs() 
        renderDogForm()
    }

    function listAllDogs (){
        tableBody.innerHTML = ''
        allDogs.forEach( dog => {
            let tr = document.createElement('tr')
            let name = document.createElement('td')
            let breed = document.createElement('td')
            let sex = document.createElement('td')
            let editButton = document.createElement('button')
            let deleteButton = document.createElement('button')
            
            name.innerText = dog.name
            breed.innerText = dog.breed
            sex.innerText = dog.sex
            deleteButton.innerText = 'delete'
            deleteButton.addEventListener('click', () => {
                let index = allDogs.indexOf(dog)
                allDogs.splice(index, 1)
                if(selectedDog == dog){
                    selectedDog = null
                }
                fetchDelete(dog)
                render()
            })

            editButton.innerText = 'edit'
            editButton.addEventListener('click', () => {
                selectedDog = dog
                render()
            })


            tr.append(name, breed, sex, editButton, deleteButton)
            tableBody.append(tr)
        })
    }

 
    function renderDogForm(){
        if(selectedDog){
            editNameInput.value = selectedDog.name
            editBreedInput.value = selectedDog.breed
            editSexInput.value = selectedDog.sex
        } else {
            editNameInput.value = ''
            editBreedInput.value = ''
            editSexInput.value = ''
        }
    }

    submitButton.addEventListener( 'click', function(e){
        e.preventDefault()
        selectedDog.name = editNameInput.value
        selectedDog.breed = editBreedInput.value
        selectedDog.sex = editSexInput.value

        fetchUpdate(selectedDog)
        render()
    })

    function fetchUpdate(selectedDog){
        fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(selectedDog) 
        })  
    }

    function fetchDelete(selectedDog){
        fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
           method: 'DELETE'
        })  
    }

fetchDogs()
})