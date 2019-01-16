// function s(arg){
//      return document.querySelector(arg)
// }  

// function c(arg){
//      return document.createElement(arg)
// }  

document.addEventListener('DOMContentLoaded', () => {

     let dogs = [];

     function getData(){
     fetch('http://localhost:3000/dogs')
          .then(res => res.json())
          .then(res => {
               dogs = res
               render()
          })
     }

     let body = document.querySelector('#table-body')
    let form = document.querySelector('#dog-form')

     function render(){
          body.innerHTML = ''
          dogs.forEach( dog => {
               let tr = document.createElement('tr')
               let td1 = document.createElement('td')
               let td2 = document.createElement('td')
               let td3 = document.createElement('td')
               let td4 = document.createElement('td')
               let button = document.createElement('button')
               button.innerText = "Edit"
               td4.append(button)
               td1.innerText = dog.name
               td2.innerText = dog.breed
               td3.innerText = dog.sex
               tr.append(td1, td2, td3, td4)
               body.append(tr)
               console.log(form.name.value)
               // console.log(dog.name)
               button.addEventListener('click', function(){
                    currentDog = dog
                    form.name.value = currentDog.name
                    form.breed.value = currentDog.breed
                    form.sex.value = currentDog.sex
               })

          })
          // let temp = document.querySelector("#dog-form")
          // submit = temp.children[3]
          // let submit = document.querySelector('#submit')
          let submit = form.submit
          submit.addEventListener('click', function(e) {
               // console.log(form.name.value ,form.breed.value,
               //      form.sex.value )
               e.preventDefault() //stops refresh
               currentDog.name = form.name.value
               currentDog.breed = form.breed.value
               currentDog.sex = form.sex.value
               fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
                    method: 'PATCH',
                    headers: {
                         'Content-Type':'application/json'
                     },
                     body: JSON.stringify(currentDog)
               })
                    .then(getData)

             
          }
          )


       
          
     }
     getData();   
})