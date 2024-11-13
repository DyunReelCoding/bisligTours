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
        // Simulate successful verification
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

    // Get user details from the sign-in form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate a successful login by using mock data
    const user = {
        name: "John Doe", // Replace with the actual user name
        profilePic: "profile-pic.jpg" // Replace with the actual profile picture URL
    };

    // Store user data in localStorage
    localStorage.setItem('userName', user.name);
    localStorage.setItem('profilePic', user.profilePic);

    // Redirect to profile page
    window.location.href = "profile.html";

    // Close the sign-in modal
    signInModal.style.display = 'none';
});

// On Profile Page, Update User Info in Navbar
window.onload = function() {
    const userName = localStorage.getItem('userName');
    const profilePic = localStorage.getItem('profilePic');

    if (userName && profilePic) {
        document.getElementById('userInfo').innerHTML = `
            <div class="user-profile">
                <img src="${profilePic}" alt="Profile Picture" class="profile-pic">
                <span>${userName}</span>
            </div>
        `;
    }
};
