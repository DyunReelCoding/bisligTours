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

// Save user data to .txt file
async function saveToFile(userData) {
    try {
        const filePath = 'user_data.txt'; // Simulated file path
        const existingData = localStorage.getItem(filePath) || ''; // Retrieve existing data
        const newData = existingData + userData; // Append new data
        localStorage.setItem(filePath, newData); // Save back to storage
        console.log('Data saved:', newData);
    } catch (error) {
        console.error('Error saving to file:', error);
        alert('Failed to save user data.');
    }
}


// Read user data from .txt file
async function readFromFile() {
    try {
        const filePath = 'user_data.txt'; // Simulated file path
        const data = localStorage.getItem(filePath); // Retrieve data
        return data || ''; // Return empty string if no data
    } catch (error) {
        console.error('Error reading from file:', error);
        alert('Failed to read user data.');
        return null;
    }
}

// Handle the sign-up form submission
const signUpForm = document.querySelector('#signUpModal form');
signUpForm.addEventListener('submit', (event) => {
    // Prevent form submission if password guidelines are not met
    if (!arePasswordGuidelinesMet()) {
        event.preventDefault(); // Stop form submission
        alert('Please ensure your password meets all the guidelines.');
        return;
    }

    // Collect input values
    const firstName = event.target[0].value.trim();
    const lastName = event.target[1].value.trim();
    const email = event.target[2].value.trim();
    const password = event.target[3].value.trim();

    // Close sign-up modal and open verification modal
    signUpModal.style.display = 'none';
    verificationModal.style.display = 'flex';

    // Attach the verification process to the "Confirm" button
    document.getElementById('confirmVerificationBtn').onclick = async function () {
        const verificationCode = document.getElementById('verificationCode').value;

        if (verificationCode === '1234') {
            // Show success message before saving
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Verification successful! Proceeding to save your data...';
            successMessage.style.color = 'green';
            successMessage.style.fontSize = '18px';
            successMessage.style.fontWeight = 'bold';
            document.body.appendChild(successMessage); // Display the success message

            // Delay to show success message before saving
            setTimeout(async function () {
                // Save user data
                const userData = `Email: ${email}, Password: ${password}, First Name: ${firstName}, Last Name: ${lastName}\n`;
                await saveToFile(userData);

                // Close verification modal and remove success message
                verificationModal.style.display = 'none';
                successMessage.style.display = 'none';

                alert('Signup successful! You can now sign in.');
            }, 1500); // Wait for 1.5 seconds to display success message before saving
        } else {
            alert('Incorrect verification code.');
        }
    };
});




// Handle the sign-in form submission
// Handle the sign-in form submission
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission that would reload the page

    // Collect input values
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();

    // Ensure the email and password fields are not empty
    if (!email || !password) {
        alert('Email and password cannot be empty!');
        return;
    }

    // Retrieve user data
    const fileContent = await readFromFile();
    if (fileContent) {
        // Parse the user data
        const users = fileContent.split('\n').map(line => {
            const parts = line.split(',');
            if (parts.length < 2) return null;

            const savedEmail = parts[0]?.split(': ')[1]?.trim();
            const savedPassword = parts[1]?.split(': ')[1]?.trim();

            return savedEmail && savedPassword ? { email: savedEmail, password: savedPassword } : null;
        }).filter(user => user !== null); // Remove invalid users

        // Compare entered email and password with the saved data
        const userExists = users.some(user =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );

        if (userExists) {
            alert('Sign in successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('No user data found. Please sign up first.');
    }
});

// Password Guidelines
const passwordField = document.getElementById('password');
const minLength = document.getElementById('minLength');
const uppercase = document.getElementById('uppercase');
const number = document.getElementById('number');
const specialChar = document.getElementById('specialChar');

// Function to check if all password guidelines are met
function arePasswordGuidelinesMet() {
    return minLength.style.color === 'green' &&
           uppercase.style.color === 'green' &&
           number.style.color === 'green' &&
           specialChar.style.color === 'green';
}

// Listen for input in the password field to validate the guidelines
passwordField.addEventListener('input', function () {
    // Check for at least 8 characters
    minLength.style.color = passwordField.value.length >= 8 ? 'green' : 'red';

    // Check for at least one uppercase letter
    uppercase.style.color = /[A-Z]/.test(passwordField.value) ? 'green' : 'red';

    // Check for at least one number
    number.style.color = /\d/.test(passwordField.value) ? 'green' : 'red';

    // Check for at least one special character
    specialChar.style.color = /[!@#$%^&*(),.?":{}|<>]/.test(passwordField.value) ? 'green' : 'red';
});