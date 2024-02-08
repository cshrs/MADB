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

// Keyboard Navigation
    
    let focusableElements = Array.from(document.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    let currentIndex = -1; // Start before the first element

    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (key === 'ArrowUp' || key === 'ArrowLeft') {
            event.preventDefault(); // Prevent scrolling
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = focusableElements.length - 1; // Loop back to the last element
            }
            focusableElements[currentIndex].focus();
        } else if (key === 'ArrowDown' || key === 'ArrowRight') {
            event.preventDefault(); // Prevent scrolling
            currentIndex++;
            if (currentIndex >= focusableElements.length) {
                currentIndex = 0; // Loop back to the first element
            }
            focusableElements[currentIndex].focus();
        }
    });
});
