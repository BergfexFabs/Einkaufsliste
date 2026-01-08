const input = document.getElementById("itemInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");

button.addEventListener("click", addItem);

function addItem() {
    if (input.value === "") return;

    const li = document.createElement("li");
    li.textContent = input.value;

    li.addEventListener("click", () => {
        li.remove();
        saveList();
    });

    list.appendChild(li);
    input.value = "";

    saveList();
}

// ?? Speichern
function saveList() {
    localStorage.setItem("items", list.innerHTML);
}

// ?? Laden
function loadList() {
    list.innerHTML = localStorage.getItem("items") || "";
}

loadList();
