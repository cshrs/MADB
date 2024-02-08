// Wait for the DOM to fully load before attaching event handlers
document.addEventListener('DOMContentLoaded', function() {
    // Text resize buttons
    const enlargeTextButton = document.getElementById('text-enlarge');
    const shrinkTextButton = document.getElementById('text-shrink');
    const body = document.body;

    // Enlarge text event listener
    if(enlargeTextButton) {
        enlargeTextButton.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(body).fontSize);
            body.style.fontSize = `${currentSize + 2}px`; // Adjusted the increase to +2 for finer control
        });
    }

    // Shrink text event listener
    if(shrinkTextButton) {
        shrinkTextButton.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(body).fontSize);
            if (currentSize > 10) { // Prevents text from becoming too small
                body.style.fontSize = `${currentSize - 2}px`; // Adjusted the decrease to -2 for finer control
            }
        });
    }

    // Read aloud selected text
    const readSelectedTextButton = document.getElementById('read-selected-text');
    if(readSelectedTextButton) {
        readSelectedTextButton.addEventListener('click', function() {
            let selectedText = window.getSelection().toString();
            if (selectedText.length > 0) {
                let speech = new SpeechSynthesisUtterance(selectedText);
                window.speechSynthesis.speak(speech);
            } else {
                alert('Please select text to read.');
            }
        });
    }

    // Enhance navigation for accessibility
    const pressHereLink = document.getElementById('pressHereLink');
    if(pressHereLink) {
        pressHereLink.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                window.location.href = this.getAttribute('href');
            }
        });
    }
});
