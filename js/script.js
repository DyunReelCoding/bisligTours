// Get the modal elements
const signUpModal = document.getElementById('signUpModal');
const signInModal = document.getElementById('signInModal');
const verificationModal = document.getElementById('verificationModal');

// Get the buttons that open the modals
const signUpBtn = document.getElementById('signUpBtn');
const signInBtn = document.getElementById('signInBtn');

// Get the <span> elements that close the modals
const closeSignUpModal = document.getElementById('closeSignUpModal');
const closeSignInModal = document.getElementById('closeSignInModal');
const closeVerificationModal = document.getElementById('closeVerificationModal');

// When the user clicks on the "Sign up" button, open the sign-up modal
signUpBtn.addEventListener('click', () => {
    signUpModal.style.display = 'flex';
});

// When the user clicks on the "Sign in" button, open the sign-in modal
signInBtn.addEventListener('click', () => {
    signInModal.style.display = 'flex';
});

// When the user clicks on <span> (x), close the sign-up modal
closeSignUpModal.addEventListener('click', () => {
    signUpModal.style.display = 'none';
});

// When the user clicks on <span> (x), close the sign-in modal
closeSignInModal.addEventListener('click', () => {
    signInModal.style.display = 'none';
});

// When the user clicks on <span> (x), close the verification modal
closeVerificationModal.addEventListener('click', () => {
    verificationModal.style.display = 'none';
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === signUpModal) {
        signUpModal.style.display = 'none';
    }
    if (event.target === signInModal) {
        signInModal.style.display = 'none';
    }
    if (event.target === verificationModal) {
        verificationModal.style.display = 'none';
    }
});

// Handle the sign-up form submission
const signUpForm = document.querySelector('#signUpModal form');
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // After successful sign-up, show the verification modal
    signUpModal.style.display = 'none'; // Close sign-up modal
    verificationModal.style.display = 'flex'; // Open verification modal
});

// Handle the verification form submission
const confirmVerificationBtn = document.getElementById('confirmVerificationBtn');
confirmVerificationBtn.addEventListener('click', () => {
    const verificationCode = document.getElementById('verificationCode').value;
    if (verificationCode) {
        // Validate the code (for now, you can simulate successful verification)
        alert('Account verified successfully!');
        verificationModal.style.display = 'none'; // Close verification modal
    } else {
        alert('Please enter the verification code.');
    }
});

// Handle the sign-in form submission
const signInForm = document.querySelector('#signInModal form');
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Sign In form submitted');
    signInModal.style.display = 'none'; // Close modal after submit
});

// Password Guidelines
const passwordField = document.getElementById('password');
const minLength = document.getElementById('minLength');
const uppercase = document.getElementById('uppercase');
const number = document.getElementById('number');
const specialChar = document.getElementById('specialChar');

passwordField.addEventListener('input', function () {
    // Check for at least 8 characters
    if (passwordField.value.length >= 8) {
        minLength.style.color = 'green';
    } else {
        minLength.style.color = 'red';
    }

    // Check for at least one uppercase letter
    if (/[A-Z]/.test(passwordField.value)) {
        uppercase.style.color = 'green';
    } else {
        uppercase.style.color = 'red';
    }

    // Check for at least one number
    if (/\d/.test(passwordField.value)) {
        number.style.color = 'green';
    } else {
        number.style.color = 'red';
    }

    // Check for at least one special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordField.value)) {
        specialChar.style.color = 'green';
    } else {
        specialChar.style.color = 'red';
    }
});

