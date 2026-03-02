const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const mobilePattern = /^[6-9]\d{9}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

let generatedOTP = "";

// ================= REAL-TIME VALIDATION =================

document.getElementById("name").addEventListener("input", function () {
    document.getElementById("nameError").textContent =
        this.value.trim() === "" ? "Name is required" : "";
});

document.getElementById("email").addEventListener("input", function () {
    document.getElementById("emailError").textContent =
        emailPattern.test(this.value) ? "" : "Invalid email format";
});

document.getElementById("mobile").addEventListener("input", function () {
    document.getElementById("mobileError").textContent =
        mobilePattern.test(this.value) ? "" : "Invalid mobile number";
});

document.getElementById("password").addEventListener("input", function () {
    document.getElementById("passwordError").textContent =
        passwordPattern.test(this.value)
            ? ""
            : "Min 8 chars, 1 uppercase, 1 number, 1 symbol";
});

// ================= OTP GENERATION =================

document.getElementById("sendOtpBtn").addEventListener("click", function () {

    const mobile = document.getElementById("mobile").value;

    if (!mobilePattern.test(mobile)) {
        alert("Enter valid mobile number first!");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    alert("Demo OTP: " + generatedOTP); // Simulated OTP
});

// ================= FINAL SUBMIT =================

document.getElementById("registrationForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const otpInput = document.getElementById("otp").value;

    if (otpInput !== generatedOTP) {
        document.getElementById("otpError").textContent = "Invalid OTP";
        return;
    }

    document.getElementById("successMessage").textContent =
        "Registration Successful!";
        
    document.getElementById("registrationForm").reset();
});