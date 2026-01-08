// Elemente
const fabianInput = document.getElementById("fabianInput");
const annaInput = document.getElementById("annaInput");
const fabianAdd = document.getElementById("fabianAdd");
const annaAdd = document.getElementById("annaAdd");
const entriesList = document.getElementById("entriesList");
const clearAllBtn = document.getElementById("clearAllBtn");
const fabianResult = document.getElementById("fabianResult");
const annaResult = document.getElementById("annaResult");
const balance = document.getElementById("balance");

// Popup Elemente
const deletePopup = document.getElementById("deletePopup");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

// Arrays für Beträge
let fabianEntries = [];
let annaEntries = [];

// LocalStorage laden
function loadEntries() {
    fabianEntries = JSON.parse(localStorage.getItem("fabianEntries")) || [];
    annaEntries = JSON.parse(localStorage.getItem("annaEntries")) || [];

    entriesList.innerHTML = "";

    fabianEntries.forEach(value => addListItem("Fabian", value));
    annaEntries.forEach(value => addListItem("Anna", value));

    calculateTotals();
}

// Einträge hinzufügen
fabianAdd.addEventListener("click", () => addEntry("fabian"));
annaAdd.addEventListener("click", () => addEntry("anna"));

function addEntry(person) {
    let value;
    if (person === "fabian") {
        value = parseFloat(fabianInput.value);
        if (isNaN(value) || value <= 0) return;
        fabianEntries.push(value);
        addListItem("Fabian", value);
        fabianInput.value = "";
    } else {
        value = parseFloat(annaInput.value);
        if (isNaN(value) || value <= 0) return;
        annaEntries.push(value);
        addListItem("Anna", value);
        annaInput.value = "";
    }
    saveEntries();
    calculateTotals();
}

// Eintrag in Liste
function addListItem(name, value) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${value.toFixed(2)} €`;
    entriesList.appendChild(li);
}

// Berechnung
function calculateTotals() {
    const fabianTotal = fabianEntries.reduce((a, b) => a + b, 0);
    const annaTotal = annaEntries.reduce((a, b) => a + b, 0);

    fabianResult.textContent = `Fabian: ${fabianTotal.toFixed(2)} €`;
    annaResult.textContent = `Anna: ${annaTotal.toFixed(2)} €`;

    const total = fabianTotal + annaTotal;
    //const fairShare = total / 2;

    const diff = (fabianTotal - annaTotal).toFixed(2);

    if (diff > 0) {
        balance.textContent = `Anna schuldet Fabian: ${diff} €`;
    } else if (diff < 0) {
        balance.textContent = `Fabian schuldet Anna: ${Math.abs(diff)} €`;
    } else {
        balance.textContent = "Beide haben gleichviel bezahlt ✅";
    }
}

// Alle Einträge löschen mit Popup
clearAllBtn.addEventListener("click", () => {
    deletePopup.style.display = "flex"; // Popup anzeigen
});

// Bestätigen Löschen
confirmDelete.addEventListener("click", () => {
    fabianEntries = [];
    annaEntries = [];
    entriesList.innerHTML = "";
    fabianResult.textContent = "Fabian: 0 €";
    annaResult.textContent = "Anna: 0 €";
    balance.textContent = "";
    saveEntries();
    deletePopup.style.display = "none";
});

// Abbrechen
cancelDelete.addEventListener("click", () => {
    deletePopup.style.display = "none";
});

// LocalStorage speichern
function saveEntries() {
    localStorage.setItem("fabianEntries", JSON.stringify(fabianEntries));
    localStorage.setItem("annaEntries", JSON.stringify(annaEntries));
}

// Beim Laden der Seite
loadEntries();
