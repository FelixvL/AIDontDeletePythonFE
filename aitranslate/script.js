//const url = "http://127.0.0.1:5000"
const url = "https://pythonapplicatie-c4fub0d3eqbyc7gt.westeurope-01.azurewebsites.net/"

// Variabelen voor knoppen
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// Audiobalken en tekstvelden
const originalAudio = document.getElementById('original-audio');
const translatedAudio = document.getElementById('translated-audio');
const originalText = document.getElementById('original-text');
const translatedText = document.getElementById('translated-text');

// MediaRecorder voor audio-opname
let mediaRecorder;
let audioChunks = [];

// Start opname
startBtn.addEventListener('click', () => {
    startRecording();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
});

// Pauze opname
pauseBtn.addEventListener('click', () => {
    if (mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.textContent = 'Doorgaan';
    } else if (mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        pauseBtn.textContent = 'Pauze';
    }
});

// Stop opname
stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
});

// Reset de pagina
resetBtn.addEventListener('click', () => {
    location.reload();
});

// Functie om opname te starten
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                originalAudio.src = audioUrl;

                // Stuur het audiobestand naar de backend
                sendAudioToBackend(audioBlob);

                // Reset de audioChunks na het stoppen
                audioChunks = [];
            };
        });
}

// Functie om audio naar de backend te sturen
// Functie om audio naar de backend te sturen
// Functie om audio naar de backend te sturen
// Functie om audio naar de backend te sturen
function sendAudioToBackend(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    const selectedLanguage = document.getElementById('language-select').value;
    formData.append('target_language', selectedLanguage);

    // Haal de volledige tekst op uit het originele tekstveld en voeg nieuwe transcriptie toe
    const existingText = originalText.value;

    fetch(url+'/ai/upload_audio', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Succes:', data);

        // Voeg de nieuwe transcriptie toe aan de bestaande tekst
        const newTranscript = existingText + "\n" + data.transcript;
        originalText.value = newTranscript;

        // Verzend de volledige tekst (met nieuwe toevoeging) naar de backend voor vertaling
        translateFullText(newTranscript, selectedLanguage);
    })
    .catch(error => {
        console.error('Error:', error);
        originalText.value = 'Er is iets misgegaan bij het uploaden van de audio.';
    });
}

// Functie om de volledige tekst te vertalen via de backend
// Functie om de volledige tekst te vertalen en audio af te spelen via de backend
function translateFullText(text, language) {
    fetch(url+'/ai/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text,
            target_language: language
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Vertaling succesvol:', data);
        translatedText.value = data.translated_text;  // Toon de vertaalde tekst in het tekstvak
        
        // Zet de URL van het audiobestand in de onderste audioplayer
        const translatedAudio = document.getElementById('translated-audio');
        translatedAudio.src = url+""+data.audio_url;
        console.log(url+""+data.audio_url)
        translatedAudio.load();  // Herlaad de audioplayer met het nieuwe bestand
        translatedAudio.play();  // Automatisch afspelen als de audio geladen is
    })
    .catch(error => {
        console.error('Error bij vertaling:', error);
        translatedText.value = 'Er is iets misgegaan bij het vertalen van de tekst.';
    });
}





