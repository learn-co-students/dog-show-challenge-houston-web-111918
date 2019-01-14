function qs(arg){
  return document.querySelector(arg)
}

function ce(arg){
  return document.createElement(arg)
}

let dogForm = qs('#dog-form')
let id = qs('#dog-form').id
let name = qs('#dog-form').name
let breed = qs('#dog-form').breed
let sex = qs('#dog-form').sex

let response

function render(arg){
  qs('#table-body').innerHTML = ''
  arg.forEach((one) => {
    let tr = ce('tr')
    let td1 = ce('td')
    let td2 = ce('td')
    let td3 = ce('td')
    let td4 = ce('td')
    let button = ce('button')
    td1.innerText = one.name
    td2.innerText = one.breed
    td3.innerText = one.sex
    button.innerText = 'Edit'
    td4.append(button)
    tr.append(td1, td2, td3, td4)
    qs('#table-body').append(tr)
    button.addEventListener('click', (e) => {
      e.preventDefault()
      id.value = one.id
      name.value = one.name
      breed.value = one.breed
      sex.value = one.sex
    })
  })
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(res => {
      response = res
      render(res)
    })
})

dogForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let data = {
    id: e.target.id.value,
    name: e.target.name.value,
    breed: e.target.breed.value,
    sex: e.target.sex.value
  }
  fetch(`http://localhost:3000/dogs/${e.target.id.value}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
    .then(res => {
      for(key of response){
        if(key.id === parseInt(data.id)){
          key.name = data.name
          key.breed = data.breed
          key.sex = data.sex
        }
      }
    })
    .then(res => render(response))
})
