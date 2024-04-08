document.addEventListener('DOMContentLoaded', function() {
// Accessibility features
const enlargeTextButton = document.getElementById('text-enlarge');
const shrinkTextButton = document.getElementById('text-shrink');
const speechButton = document.getElementById('text-speech');
const body = document.body;

enlargeTextButton.addEventListener('click', function() {
    const currentSize = parseFloat(getComputedStyle(body).fontSize);
    body.style.fontSize = `${currentSize + 2}px`;

    // Adjust font size of <p>, <p><strong>, and <h2> elements
    document.querySelectorAll('p, p strong, h2, button').forEach(function(element) {
        const currentElementSize = parseFloat(getComputedStyle(element).fontSize);
        element.style.fontSize = `${currentElementSize + 2}px`;
    });
});

shrinkTextButton.addEventListener('click', function() {
    const currentSize = parseFloat(getComputedStyle(body).fontSize);
    if (currentSize > 10) {
        body.style.fontSize = `${currentSize - 2}px`;

        // Adjust font size of <p>, <p><strong>, and <h2> elements
        document.querySelectorAll('p, p strong, h2, button').forEach(function(element) {
            const currentElementSize = parseFloat(getComputedStyle(element).fontSize);
            if (currentElementSize > 10) {
                element.style.fontSize = `${currentElementSize - 2}px`;
            }
        });
    }
});

speechButton.addEventListener('click', function() {
    const text = body.textContent || body.innerText;
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
});

speechButton.addEventListener('click', function() {
    const text = body.textContent || body.innerText;
    let speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
});



    // JavaScript code for step-by-step guide navigation
document.querySelectorAll('.guide-navigation').forEach(function(nav) {
    const prevButton = nav.querySelector('.prev-guide-step');
    const nextButton = nav.querySelector('.next-guide-step');
    const guidePages = nav.parentElement.querySelectorAll('.guide-page');

    let currentStep = 0;

    // Hide all guide pages except the first one
    guidePages.forEach((page, index) => {
        if (index !== currentStep) {
            page.style.display = 'none';
        }
    });

    // Function to show current step and hide others
    function showStep(step) {
        guidePages.forEach((page, index) => {
            if (index === step) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    }

    $(document).ready(function() {
        // Keyboard navigation for 'A' and 'D' keys
        $(document).keydown(function(event) {
            // Check if 'A' key is pressed
            if (event.key === 'a' || event.key === 'A') {
                $('.prev-guide-step:visible').trigger('click');
            }
            // Check if 'D' key is pressed
            else if (event.key === 'd' || event.key === 'D') {
                $('.next-guide-step:visible').trigger('click');
            }
        });
    });
    
    // Dropdown toggle with jQuery for consistency
    $(document).ready(function() {
        $('.dropdown-btn').click(function() {
            $(this).next('.dropdown-content').slideToggle('fast');
        });
    });

    // Keyboard navigation
    function navigate(direction) {
        var links = document.querySelectorAll('.nav li a');
        var currentIndex = 0;
        links.forEach((link, index) => {
            if(link.classList.contains('active')) {
                currentIndex = index;
            }
        });

        var newIndex = currentIndex + direction;
        if(newIndex < 0) newIndex = links.length - 1;
        if(newIndex >= links.length) newIndex = 0;

        window.location.href = links[newIndex].href;
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            navigate(-1);
        } else if (event.key === 'ArrowRight') {
            navigate(1);
        }
    });
});

// animation stuff 
$(document).ready(function() {
    $('.guide-option').click(function() {
        var guideId = $(this).data('guide');
        
        // Instantly hide all guide contents
        $('.guide-content').hide();

        // Fade in the selected guide content
        $('#' + guideId).fadeIn('slow');
    });
});

// Quiz
document.getElementById('check-answers').addEventListener('click', function() {
    const answers = {
        q1: 'b', // Correct answer: b
        q2: 'c', // Correct answer: c
        q3: 'b', // Correct answer: b
        q4: 'b', // Correct answer: b
        q5: 'b', // Correct answer: b
        q6: 'b', // Correct answer: b
        q7: 'c', // Correct answer: c
        q8: 'b', // Correct answer: b
        q9: 'b', // Correct answer: b
        q10: 'b' // Correct answer: b
    };
    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    Object.keys(answers).forEach(question => {
        const selectedOption = document.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption && selectedOption.value === answers[question]) {
            score++;
        }
    });

    const resultText = `Your score is ${score} out of ${totalQuestions}.`;
    document.getElementById('quiz-results').textContent = resultText; // Display results on the page
});


// Guide keyboard nav

document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners for keyboard navigation
    document.querySelectorAll(".guide-content").forEach(function (guide) {
        const prevButton = guide.querySelector(".prev-guide-step");
        const nextButton = guide.querySelector(".next-guide-step");
        
        document.addEventListener("keydown", function (event) {
            if (event.key === "a" || event.key === "A") {
                prevButton.click();
            } else if (event.key === "d" || event.key === "D") {
                nextButton.click();
            }
        });
    });
});

// Image enlarge
$(document).ready(function() {
    $('.enlarge-image').click(function() {
        // Toggle the 'zoomed' class which controls the zoom
        $(this).toggleClass('zoomed');
    });
});

