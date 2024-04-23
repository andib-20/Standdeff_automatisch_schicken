// HTML für das Eingabefenster und den Button
const inputDiv = document.createElement('div');
inputDiv.innerHTML = `
    <textarea id="inputText" rows="10" cols="50"></textarea><br>
    <button id="nextBtn">Weiter</button>
`;
document.body.appendChild(inputDiv);

let data = [];

// Event Listener für den "Weiter" Button
document.getElementById('nextBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    data = parseInput(inputText);
    showSummary(data);
});

// Funktion zum Parsen der Eingabe
function parseInput(inputText) {
    const lines = inputText.split('\n');
    const data = lines.map(line => {
        const parts = line.split(' ');
        const coords = parts[1].match(/\((\d+)\|(\d+)\)/);
        return {
            x: coords[1],
            y: coords[2],
            deff: parts[3],
            needed: parts[4],
            player: parts.slice(5, -1).join(' '),
            note: parts.slice(-1)[0]
        };
    });
    return data;
}

// Funktion zum Anzeigen der Zusammenfassung
function showSummary(data) {
    const summaryDiv = document.createElement('div');
    summaryDiv.innerHTML = '<h2>Zusammenfassung</h2>';
    
    data.forEach((item, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="checkbox" id="check${index}" value="${index}">
            <label for="check${index}">${item.x}|${item.y} - Deff: ${item.deff} - Benötigt: ${item.needed}</label>
            <input type="number" id="packages${index}" value="0">
        `;
        summaryDiv.appendChild(div);
    });

    summaryDiv.innerHTML += '<button id="sendBtn">Weiter</button>';
    document.body.innerHTML = '';
    document.body.appendChild(summaryDiv);

    // Event Listener für den "Weiter" Button
    document.getElementById('sendBtn').addEventListener('click', function() {
        sendDeff(data);
    });
}

// Funktion zum Senden der Deff
function sendDeff(data) {
    const selectedData = data.filter((item, index) => {
        return document.getElementById(`check${index}`).checked;
    })[0]; // Hier nehmen wir nur das erste ausgewählte Dorf, du kannst das anpassen

    if (!selectedData) {
        alert('Bitte wähle ein Dorf aus.');
        return;
    }

    const packages = document.getElementById(`packages${data.indexOf(selectedData)}`).value;
    
    const url = `https://de224.die-staemme.de/game.php?&screen=place`;
    window.open(url);

    // Hier musst du den Code für das Automatisieren des Massenunterstützungsprozesses hinzufügen
}
