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

    speechButton.addEventListener('click', function() {
        const text = body.textContent || body.innerText;
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    });
});

// Event listeners 
document.addEventListener('DOMContentLoaded', function() {
    const pressHereLink = document.getElementById('pressHereLink');

    pressHereLink.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            window.location.href = this.getAttribute('href');
        }
    });
});
