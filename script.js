// HTML für das Popup-Fenster
const popupHTML = `
<div id="deffPopup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; padding: 20px; border: 1px solid #ccc; z-index: 9999;">
    <textarea id="deffInput" rows="10" cols="50" placeholder="Standdeff Anfrage hier einfügen"></textarea>
    <button id="weiterButton">Weiter</button>
</div>
`;

// Funktion zum Erstellen des Popups
function createPopup() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.innerHTML = popupHTML;
    body.appendChild(div);

    document.getElementById('weiterButton').addEventListener('click', processInput);
}

// Funktion zur Verarbeitung der Eingabe
function processInput() {
    const input = document.getElementById('deffInput').value;
    const lines = input.split('\n');

    const villages = lines.map(line => {
        const parts = line.split(' ');
        const coords = parts[1].split('(')[1].split(')')[0].split('|');
        const x = coords[0];
        const y = coords[1];
        const deffNeeded = parseInt(parts[2]);
        const deffRemaining = parseInt(parts[3]);
        
        return {
            coords: { x, y },
            deffNeeded,
            deffRemaining
        };
    });

    showSummary(villages);
}

// Funktion zur Anzeige der Zusammenfassung
function showSummary(villages) {
    const summaryHTML = `
    <div id="summary">
        ${villages.map((village, index) => `
        <div>
            <input type="checkbox" id="check${index}" />
            <label for="check${index}">${village.coords.x}|${village.coords.y} - Noch benötigt: ${village.deffNeeded - village.deffRemaining}</label>
            <input type="number" id="amount${index}" placeholder="Anzahl Pakete" />
        </div>
        `).join('')}
        <button id="continueButton">Weiter</button>
    </div>
    `;

    const popup = document.getElementById('deffPopup');
    popup.innerHTML = summaryHTML;

    document.getElementById('continueButton').addEventListener('click', sendTroops);
}

// Funktion zum Senden der Truppen
function sendTroops() {
    const selectedVillages = [];
    const amountInputs = document.querySelectorAll('[id^="amount"]');
    
    amountInputs.forEach((input, index) => {
        const amount = parseInt(input.value);
        if (amount > 0) {
            const coords = villages[index].coords;
            selectedVillages.push({ coords, amount });
        }
    });

    if (selectedVillages.length > 0) {
        openTroopsPage(selectedVillages);
    }
}

// Funktion zum Öffnen der Truppenseite
function openTroopsPage(villages) {
    const url = 'https://de224.die-staemme.de/game.php?&screen=place';
    window.open(url, '_blank');

    // Hier müsstest du den Code einfügen, der die Truppen sendet.
    // Zum Beispiel: Koordinaten einfügen, SD1 auswählen, Abschicken klicken.
}

// Aufruf der Funktion zum Erstellen des Popups
createPopup();
