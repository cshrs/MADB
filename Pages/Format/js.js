// Format/js.js

// Buttons

document.addEventListener('DOMContentLoaded', function() {
    const enlargeTextButton = document.getElementById('text-enlarge');
    const shrinkTextButton = document.getElementById('text-shrink');
    const speechButton = document.getElementById('text-speech');
    const body = document.body;

    enlargeTextButton.addEventListener('click', function() {
        const currentSize = parseFloat(getComputedStyle(body).fontSize);
        body.style.fontSize = (currentSize + 10) + 'px';
    });

    shrinkTextButton.addEventListener('click', function() {
        const currentSize = parseFloat(getComputedStyle(body).fontSize);
        if (currentSize > 10) { // Prevents text from becoming too small
            body.style.fontSize = (currentSize - 10) + 'px';
        }
    });

// Read allowed selected text

document.getElementById('read-selected-text').addEventListener('click', function() {
    // Get the selected text
    let selectedText = window.getSelection().toString();
    
    // Check if there's selected text
    if (selectedText.length > 0) {
        // Create a new SpeechSynthesisUtterance object
        let speech = new SpeechSynthesisUtterance(selectedText);
        
        // Optionally, customize the speech properties
        // speech.voice = speechSynthesis.getVoices().filter(voice => voice.name == "Google UK English Male")[0];
        // speech.pitch = 1; // Can be between 0 and 2
        // speech.rate = 1; // Can be between 0.1 and 10
        
        // Speak the selected text
        window.speech

    
// Event listeners 
document.addEventListener('DOMContentLoaded', function() {
    const pressHereLink = document.getElementById('pressHereLink');

    pressHereLink.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            window.location.href = this.getAttribute('href');
        }
    });
});
