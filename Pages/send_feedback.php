<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $feedback = htmlspecialchars($_POST["feedback"]);
    $experience = htmlspecialchars($_POST["experience"]);
    $suggestions = htmlspecialchars($_POST["suggestions"]);
    $improvementAreas = isset($_POST["improvementAreas"]) ? implode(", ", $_POST["improvementAreas"]) : "None specified";

    $to = "your_email@example.com";
    $subject = "Website Feedback Received";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Experience Rating: $experience\n";
    $email_content .= "Improvement Areas: $improvementAreas\n";
    $email_content .= "Feedback:\n$feedback\n";
    $email_content .= "Suggestions:\n$suggestions\n";

    $headers = "From: $name <$email>";

    if (mail($to, $subject, $email_content, $headers)) {
        echo "Thank you for your feedback!";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    echo "Submission failed. Please try again.";
}
?>
