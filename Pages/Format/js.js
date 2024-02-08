document.addEventListener('DOMContentLoaded', () => {
    const enlargeButton = document.getElementById('text-enlarge');
    const shrinkButton = document.getElementById('text-shrink');
    const speechButton = document.getElementById('text-speech');

    enlargeButton.addEventListener('click', () => {
        document.body.style.fontSize = 'larger';
    });

    shrinkButton.addEventListener('click', () => {
        document.body.style.fontSize = 'smaller';
    });

    speechButton.addEventListener('click', () => {
        let text = document.getElementById('main-content').textContent;
        responsiveVoice.speak(text); // Using ResponsiveVoice API
    });
});
