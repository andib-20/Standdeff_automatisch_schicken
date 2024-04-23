// Erstelle das Eingabefenster
function createInputWindow() {
    const inputWindow = document.createElement('div');
    inputWindow.style.position = 'fixed';
    inputWindow.style.top = '0';
    inputWindow.style.left = '0';
    inputWindow.style.width = '100%';
    inputWindow.style.height = '100%';
    inputWindow.style.backgroundColor = 'rgba(0,0,0,0.7)';
    inputWindow.style.zIndex = '9999';

    const inputBox = document.createElement('textarea');
    inputBox.style.width = '80%';
    inputBox.style.height = '50%';
    inputBox.style.margin = '20% auto';
    inputBox.style.display = 'block';
    inputBox.placeholder = 'Kopiere deine Standdeff Anfrage hier rein...';

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Weiter';
    nextButton.onclick = () => parseInput(inputBox.value);

    inputWindow.appendChild(inputBox);
    inputWindow.appendChild(nextButton);

    document.body.appendChild(inputWindow);
}

// Parse die Eingabe und erstelle die Zusammenfassung
function parseInput(inputText) {
    const lines = inputText.split('\n');
    const summaryWindow = document.createElement('div');
    summaryWindow.style.position = 'fixed';
    summaryWindow.style.top = '0';
    summaryWindow.style.left = '0';
    summaryWindow.style.width = '100%';
    summaryWindow.style.height = '100%';
    summaryWindow.style.backgroundColor = 'rgba(0,0,0,0.7)';
    summaryWindow.style.zIndex = '9999';

    const summaryContent = document.createElement('div');
    summaryContent.style.width = '80%';
    summaryContent.style.height = '50%';
    summaryContent.style.margin = '20% auto';
    summaryContent.style.display = 'block';

    lines.forEach((line, index) => {
        const parts = line.split(/\s+/);
        if (parts.length >= 5) {
            const coords = parts[1].match(/\((\d+)\|(\d+)\)/);
            if (coords) {
                const x = coords[1];
                const y = coords[2];
                const needed = parts[3];
                const remaining = parts[4];

                const row = document.createElement('div');
                row.innerHTML = `
                    <input type="checkbox" id="check${index}" value="${x}|${y}">
                    <label for="check${index}">${x}|${y}</label>
                    <input type="number" id="amount${index}" placeholder="Pakete">
                `;
                summaryContent.appendChild(row);
            }
        }
    });

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Weiter';
    nextButton.onclick = () => openMassSupport(summaryContent);

    summaryWindow.appendChild(summaryContent);
    summaryWindow.appendChild(nextButton);

    document.body.appendChild(summaryWindow);
}

// Öffne den Massenunterstützungsbildschirm
function openMassSupport(summaryContent) {
    // Dein Code zum Öffnen des Versammlungsplatzes und weiteren Schritten
    // Zum Beispiel:
    const selectedCoords = Array.from(summaryContent.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    console.log('Ausgewählte Koordinaten:', selectedCoords);
    
    // Hier müsstest du den Versammlungsplatz öffnen, die Koordinaten einfügen usw.
    // Da es sich um eine spezifische Webseite handelt, müsstest du den entsprechenden Code hinzufügen.
}

// Füge den Button hinzu, um das Eingabefenster zu starten
const startButton = document.createElement('button');
startButton.innerText = 'Starte Standdeff Skript';
startButton.onclick = () => createInputWindow();

document.body.appendChild(startButton);
