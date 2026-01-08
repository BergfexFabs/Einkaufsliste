const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearDone");
const list = document.getElementById("list");

addBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearDoneItems);

function addItem() {
    if (input.value === "") return;

    const li = document.createElement("li");
    li.textContent = input.value;

    li.addEventListener("click", () => {
        li.classList.toggle("done");
        saveList();
    });

    list.appendChild(li);
    input.value = "";

    saveList();
}

function clearDoneItems() {
    const items = document.querySelectorAll(".done");
    items.forEach(item => item.remove());
    saveList();
}

// ?? Speichern
function saveList() {
    localStorage.setItem("items", list.innerHTML);
}

// ?? Laden
function loadList() {
    list.innerHTML = localStorage.getItem("items") || "";

    // Click-Listener nach dem Laden wieder setzen
    document.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            li.classList.toggle("done");
            saveList();
        });
    });
}

loadList();
