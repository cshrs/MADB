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
        let score = 0;
        
        // Iterate through each question and mark it as correct or incorrect
        Object.keys(answers).forEach(question => {
            const questionDiv = document.querySelector(`input[name="${question}"]`).closest('.quiz-question');
            const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
            
            if (selectedOption && selectedOption.value === answers[question]) {
                // Increment score and mark as correct
                score++;
                questionDiv.classList.add('correct');
                questionDiv.classList.remove('incorrect');
            } else {
                // Mark as incorrect
                questionDiv.classList.add('incorrect');
                questionDiv.classList.remove('correct');
            }
        });
        
        document.getElementById('quiz-results').textContent = `Your score is ${score} out of ${Object.keys(answers).length}.`;
        
        // Scroll to the results section
        document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth' });
    });
    
    window.toggleImageSize = image => image.classList.toggle('enlarged');

    // Add 'A' and 'D' keyboard navigation for guide steps
    document.addEventListener("keydown", function (event) {
        if (event.key.toLowerCase() === "a") {
            document.querySelector(".prev-guide-step")?.click();
        } else if (event.key.toLowerCase() === "d") {
            document.querySelector(".next-guide-step")?.click();
        }
    });
});

function showNextGuide(nextGuideId) {
    // Hide all guide contents
    document.querySelectorAll('.guide-content').forEach(guide => {
        guide.style.display = 'none';
    });
    // Show the next guide based on the provided ID
    document.getElementById(nextGuideId).style.display = 'block';
}