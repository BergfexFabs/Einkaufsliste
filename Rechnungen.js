const fabianInput = document.getElementById("fabian");
const annaInput = document.getElementById("anna");
const calculateBtn = document.getElementById("calculateBtn");
const fabianResult = document.getElementById("fabianResult");
const annaResult = document.getElementById("annaResult");
const balance = document.getElementById("balance");

calculateBtn.addEventListener("click", calculate);

function calculate() {
    const fabian = parseFloat(fabianInput.value) || 0;
    const anna = parseFloat(annaInput.value) || 0;

    fabianResult.textContent = `Fabian: ${fabian.toFixed(2)} €`;
    annaResult.textContent = `Anna: ${anna.toFixed(2)} €`;

    const total = fabian + anna;
    const fairShare = total / 2;

    if (fabian > fairShare) {
        const diff = fabian - fairShare;
        balance.textContent = `Anna schuldet Fabian: ${diff.toFixed(2)} €`;
    } else if (anna > fairShare) {
        const diff = anna - fairShare;
        balance.textContent = `Fabian schuldet Anna: ${diff.toFixed(2)} €`;
    } else {
        balance.textContent = "Beide haben gleichviel bezahlt ?";
    }
}
