// ---------------------------
// Elemente
// ---------------------------
const fabianInput = document.getElementById("fabianInput");
const annaInput = document.getElementById("annaInput");
const fabianAdd = document.getElementById("fabianAdd");
const annaAdd = document.getElementById("annaAdd");
const entriesList = document.getElementById("entriesList");
const calculateBtn = document.getElementById("calculateBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const fabianResult = document.getElementById("fabianResult");
const annaResult = document.getElementById("annaResult");
const balance = document.getElementById("balance");

// ---------------------------
// Arrays für Beträge
// ---------------------------
let fabianEntries = [];
let annaEntries = [];

// ---------------------------
// Einträge hinzufügen
// ---------------------------
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
}

// ---------------------------
// Eintrag in die HTML-Liste
// ---------------------------
function addListItem(name, value) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${value.toFixed(2)} €`;
    entriesList.appendChild(li);
}

// ---------------------------
// Berechnung der Gesamtsummen & Schuld
// ---------------------------
calculateBtn.addEventListener("click", calculateTotals);

function calculateTotals() {
    const fabianTotal = fabianEntries.reduce((a, b) => a + b, 0);
    const annaTotal = annaEntries.reduce((a, b) => a + b, 0);

    // Anzeige der Gesamtsummen
    fabianResult.textContent = `Fabian: ${fabianTotal.toFixed(2)} €`;
    annaResult.textContent = `Anna: ${annaTotal.toFixed(2)} €`;

    // Fair-Share Berechnung
    const total = fabianTotal + annaTotal;
    const fairShare = total / 2;

    const diff = (fabianTotal - fairShare).toFixed(2);

    if (diff > 0) {
        balance.textContent = `Anna schuldet Fabian: ${diff} €`;
    } else if (diff < 0) {
        balance.textContent = `Fabian schuldet Anna: ${Math.abs(diff)} €`;
    } else {
        balance.textContent = "Beide haben gleichviel bezahlt ✅";
    }
}

// ---------------------------
// Alle Einträge löschen
// ---------------------------
clearAllBtn.addEventListener("click", () => {
    fabianEntries = [];
    annaEntries = [];
    entriesList.innerHTML = "";
    fabianResult.textContent = "Fabian: 0 €";
    annaResult.textContent = "Anna: 0 €";
    balance.textContent = "";
});
