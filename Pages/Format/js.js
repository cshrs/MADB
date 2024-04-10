// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const enlargeTextButton = document.getElementById('text-enlarge');
    const shrinkTextButton = document.getElementById('text-shrink');
    const speechButton = document.getElementById('text-speech');
    const body = document.body;

    // Function to adjust font size based on increase/decrease flag
    function adjustFontSize(increase = true) {
        const adjustment = increase ? 2 : -2; // Amount to adjust font size
        const currentSize = parseFloat(getComputedStyle(body).fontSize); // Get current font size
        // Prevent font size from becoming too small when decreasing
        if (!increase && currentSize <= 10) return;

        // Adjust body font size
        body.style.fontSize = `${currentSize + adjustment}px`;
        
        // Adjust font size of specific elements
        document.querySelectorAll('p, p strong, h2, button').forEach(element => {
            const currentElementSize = parseFloat(getComputedStyle(element).fontSize);
            // Ensure font size doesn't become too small when decreasing
            if (increase || (!increase && currentElementSize > 10)) {
                element.style.fontSize = `${currentElementSize + adjustment}px`;
            }
        });
    }

    // Add event listeners for text size adjustment buttons
    enlargeTextButton.addEventListener('click', () => adjustFontSize());
    shrinkTextButton.addEventListener('click', () => adjustFontSize(false));

    // Add event listener for text-to-speech button
    speechButton.addEventListener('click', function() {
        const text = body.textContent || body.innerText;
        let speech = new SpeechSynthesisUtterance(text); // Create speech synthesis instance
        window.speechSynthesis.speak(speech); // Speak the text
    });

    // Iterate through guide navigation elements
    document.querySelectorAll('.guide-navigation').forEach(nav => {
        const prevButton = nav.querySelector('.prev-guide-step');
        const nextButton = nav.querySelector('.next-guide-step');
        const guidePages = nav.parentElement.querySelectorAll('.guide-page');
        let currentStep = 0; // Track current step of guide

        // Display the first guide page and hide the rest
        guidePages.forEach((page, index) => page.style.display = index ? 'none' : 'block');

        // Function to show the specified step of the guide
        function showStep(step) {
            guidePages.forEach((page, index) => page.style.display = index === step ? 'block' : 'none');
        }

        // Add event listeners for previous and next buttons
        prevButton.addEventListener('click', () => {
            if (currentStep > 0) showStep(--currentStep);
        });

        nextButton.addEventListener('click', () => {
            if (currentStep < guidePages.length - 1) showStep(++currentStep);
        });
    });

    // jQuery code for dropdown menu and guide navigation
    $(document).ready(function() {
        $('.dropdown-btn').click(function() {
            $(this).next('.dropdown-content').slideToggle('fast');
        });

        $('.guide-option').click(function() {
            var guideId = $(this).data('guide');
            $('.guide-content').hide();
            $('#' + guideId).fadeIn('slow');
        });
    });

    // Function to navigate links with arrow keys
    function navigateLinks(direction) {
        var links = Array.from(document.querySelectorAll('.nav li a'));
        var currentIndex = links.findIndex(link => link.classList.contains('active'));
        var newIndex = (currentIndex + direction + links.length) % links.length;
        if(links[newIndex]) window.location.href = links[newIndex].href;
    }

    // Event listener for arrow key navigation
    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') navigateLinks(-1);
        else if (event.key === 'ArrowRight') navigateLinks(1);
    });

    // Event listener for checking quiz answers
    document.getElementById('check-answers').addEventListener('click', function() {
        const answers = {q1: 'b', q2: 'c', q3: 'b', q4: 'b', q5: 'b', q6: 'b', q7: 'c', q8: 'b', q9: 'b', q10: 'b'};
        let score = Object.keys(answers).reduce((acc, question) => {
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            return acc + (selectedOption && selectedOption.value === answers[question] ? 1 : 0);
        }, 0);

        document.getElementById('quiz-results').textContent = `Your score is ${score} out of ${Object.keys(answers).length}.`;
    });

    // Function to navigate guide steps using 'A' and 'D' keys
    document.addEventListener("keydown", function (event) {
        if (event.key.toLowerCase() === "a") {
            document.querySelector(".prev-guide-step")?.click();
        } else if (event.key.toLowerCase() === "d") {
            document.querySelector(".next-guide-step")?.click();
        }
    });

    // Add click event listener for image zoom functionality
    document.querySelectorAll('.enlarge-image').forEach(image => {
        image.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });
});
