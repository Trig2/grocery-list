const groceryList = JSON.parse(localStorage.getItem("store")) || [];
const input = document.querySelector("#search");
const inputSearch = document.querySelector("#filter");
let id = 0;
const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  addGocery();
  renderGroceries();
  input.value = "";
});

renderGroceries();
function renderGroceries() {
  if (groceryList) {
    document.querySelector("footer").innerHTML = `${groceryList.length} items`;
    if (groceryList.length === 1) {
      document.querySelector("footer").innerHTML = `${groceryList.length} item`;
    } else if (groceryList.length === 0) {
      document.querySelector("footer").innerHTML = "Empty list";
    }
  }

  let groceryHtml = "";
  groceryList.forEach((grocery) => {
    const { name } = grocery;
    const html = `
  <li>
    <input type="checkbox" class="check" id="${id++}" />
    <p>${name}</p>
    <button type="button" class="delete">Delete</button>
  </li>
  `;
    groceryHtml += html;
  });
  document.querySelector("ul").innerHTML = groceryHtml;
  const btn = document.querySelectorAll(".delete");
  btn.forEach((button, index) => {
    button.addEventListener("click", () => {
      groceryList.splice(index, 1);
      renderGroceries();
      localStorage.setItem("store", JSON.stringify(groceryList));
    });
  });

  const check = document.querySelectorAll(".check");
  check.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {});
  });
  if (!groceryHtml) {
    document.querySelector("ul").innerHTML =
      "<p class='empty'>Your list is empty</p>";
  }
}
const addGocery = async () => {
  const inputValue = input.value;
  if (!inputValue) {
    document.querySelector(".noti").placeholder = "Please enter name of item";
  } else {
    groceryList.push({ name: inputValue });
    localStorage.setItem("store", JSON.stringify(groceryList));
    document.querySelector(".noti").placeholder = "Add item";
  }
};

function handleSearch() {
  inputSearch.addEventListener("keyup", () => {
    const inputFilter = inputSearch.value.toUpperCase();
    const li = document.querySelectorAll("li p");
    li.forEach((li) => {
      let textValue = li.innerText;
      if (textValue.toUpperCase().indexOf(inputFilter) > -1) {
        li.style = "color:green";
      } else {
        li.style = "color:black";
      }
      if (inputFilter == 0) {
        li.style = "color:black";
      }
    });
  });
}
handleSearch();
