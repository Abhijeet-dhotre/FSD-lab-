document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var mobile = document.getElementById("mobile").value.trim();

    // Error elements
    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var mobileError = document.getElementById("mobileError");
    var successMessage = document.getElementById("successMessage");

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    mobileError.textContent = "";
    successMessage.textContent = "";

    var isValid = true;

    // Name validation
    if (name === "") {
        nameError.textContent = "Name must not be empty";
        isValid = false;
    }

    // Email validation
    var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        emailError.textContent = "Email must not be empty";
        isValid = false;
    } else if (!email.match(emailPattern)) {
        emailError.textContent = "Enter valid email address";
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long";
        isValid = false;
    }

    // Mobile validation
    if (isNaN(mobile) || mobile.length !== 10) {
        mobileError.textContent = "Enter valid 10-digit mobile number";
        isValid = false;
    }

    // Success
    if (isValid) {
        successMessage.textContent = "Form submitted successfully!";
        document.getElementById("registrationForm").reset();
    }
});