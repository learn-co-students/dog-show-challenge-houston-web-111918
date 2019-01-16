// UTILS;
let s = function(selector) {
  return document.querySelector(selector);
};
let c = function(tagName) {
  return document.createElement(tagName);
};

const URL = "http://localhost:3000/dogs";

// HTML ELEMENTS
let dogTable = s("#table-body");
let editName = s("#name");
let editBreed = s("#breed");
let editSex = s("#sex");
let editSubmit = s("#submit");

// Variable data
let dogs = [];
let changedDog = null;

fetch(URL)
  .then(res => res.json())
  .then(res => (dogs = res))
  .then(render);

// const render = () => {
function render() {
  dogTable.innerHTML = "";
  dogs.forEach(dog => {
    let dogTableRecord = c("tr");
    let dogDataName = c("td");
    let dogDataBreed = c("td");
    let dogDataSex = c("td");
    let dogEditButton = c("button");

    dogDataName.innerText = dog.name;
    dogDataBreed.innerText = dog.breed;
    dogDataSex.innerText = dog.sex;
    dogEditButton.innerText = dog.button;
    dogEditButton.innerText = "  edit dog  ";

    dogTableRecord.append(dogDataName, dogDataBreed, dogDataSex, dogEditButton);
    dogTable.append(dogTableRecord);

    dogEditButton.addEventListener("click", () => {
      editName.value = dogDataName.innerText;
      editBreed.value = dogDataBreed.innerText;
      editSex.value = dogDataSex.innerText;
      changedDog = dog;
    });
  });
}

editSubmit.addEventListener("click", e => {
  e.preventDefault();

  changedDog.name = editName.value;
  changedDog.breed = editBreed.value;
  changedDog.sex = editSex.value;

  console.log(changedDog);
  render();
  fetch(`http://localhost:3000/dogs/${changedDog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changedDog)
  });
});
