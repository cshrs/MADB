document.addEventListener('DOMContentLoaded', function() {
    const enlargeTextButton = document.getElementById('text-enlarge');
    const shrinkTextButton = document.getElementById('text-shrink');
    const speechButton = document.getElementById('text-speech');
    const body = document.body;

    function adjustFontSize(increase = true) {
        const adjustment = increase ? 2 : -2;
        const currentSize = parseFloat(getComputedStyle(body).fontSize);
        if (!increase && currentSize <= 10) return;

        body.style.fontSize = `${currentSize + adjustment}px`;
        document.querySelectorAll('p, p strong, h2, button').forEach(element => {
            const currentElementSize = parseFloat(getComputedStyle(element).fontSize);
            if (increase || (!increase && currentElementSize > 10)) {
                element.style.fontSize = `${currentElementSize + adjustment}px`;
            }
        });
    }

    enlargeTextButton.addEventListener('click', () => adjustFontSize());
    shrinkTextButton.addEventListener('click', () => adjustFontSize(false));

    speechButton.addEventListener('click', function() {
        const text = body.textContent || body.innerText;
        let speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    });

    document.querySelectorAll('.guide-navigation').forEach(nav => {
        const prevButton = nav.querySelector('.prev-guide-step');
        const nextButton = nav.querySelector('.next-guide-step');
        const guidePages = nav.parentElement.querySelectorAll('.guide-page');
        let currentStep = 0;

        guidePages.forEach((page, index) => page.style.display = index ? 'none' : 'block');

        function showStep(step) {
            guidePages.forEach((page, index) => page.style.display = index === step ? 'block' : 'none');
        }

        prevButton.addEventListener('click', () => {
            if (currentStep > 0) showStep(--currentStep);
        });

        nextButton.addEventListener('click', () => {
            if (currentStep < guidePages.length - 1) showStep(++currentStep);
        });
    });

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

    function navigateLinks(direction) {
        var links = Array.from(document.querySelectorAll('.nav li a'));
        var currentIndex = links.findIndex(link => link.classList.contains('active'));
        var newIndex = (currentIndex + direction + links.length) % links.length;
        if(links[newIndex]) window.location.href = links[newIndex].href;
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') navigateLinks(-1);
        else if (event.key === 'ArrowRight') navigateLinks(1);
    });

    document.getElementById('check-answers').addEventListener('click', function() {
        const answers = {q1: 'b', q2: 'c', q3: 'b', q4: 'b', q5: 'b', q6: 'b', q7: 'c', q8: 'b', q9: 'b', q10: 'b'};
        let score = Object.keys(answers).reduce((acc, question) => {
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            return acc + (selectedOption && selectedOption.value === answers[question] ? 1 : 0);
        }, 0);

        document.getElementById('quiz-results').textContent = `Your score is ${score} out of ${Object.keys(answers).length}.`;
    });

    window.toggleImageSize = image => image.classList.toggle('enlarged');

    document.addEventListener('DOMContentLoaded', function() {
    
        // Add keyboard navigation for guide steps.
        document.addEventListener("keydown", function(event) {
            // Check if 'A' or 'D' was pressed.
            if (event.key.toLowerCase() === "a") {
                // Trigger click on the "Previous Step" button of the visible guide.
                document.querySelectorAll(".guide-navigation .prev-guide-step").forEach(button => {
                    // Only click if the button's guide content is visible.
                    if (!button.closest(".guide-content").style.display.includes('none')) {
                        button.click();
                    }
                });
            } else if (event.key.toLowerCase() === "d") {
                // Trigger click on the "Next Step" button of the visible guide.
                document.querySelectorAll(".guide-navigation .next-guide-step").forEach(button => {
                    // Only click if the button's guide content is visible.
                    if (!button.closest(".guide-content").style.display.includes('none')) {
                        button.click();
                    }
                });
            }
        });
    });
    