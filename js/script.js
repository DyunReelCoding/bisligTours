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
async function saveToFile(data) {
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'user_data.txt',
            types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
        });
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(data);
        await writableStream.close();
        alert("Signup successful! You can now sign in.");
    } catch (error) {
        console.error("Error saving file:", error);
        alert("Failed to save signup data.");
    }
}

// Read user data from .txt file
async function readFromFile() {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
        });
        const file = await fileHandle.getFile();
        return await file.text();
    } catch (error) {
        console.error("Error reading file:", error);
        alert("Failed to read user data.");
        return null;
    }
}

// Handle the sign-up form submission
const signUpForm = document.querySelector('#signUpModal form');
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect input values
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;

    // Ensure password meets all guidelines
    if (!arePasswordGuidelinesMet()) {
        alert("Password does not meet the required guidelines.");
        return; // Prevent form submission if guidelines aren't met
    }

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
                // Save user data to localStorage
                localStorage.setItem('firstName', firstName);
                localStorage.setItem('lastName', lastName);
                localStorage.setItem('profilePic', '../images/pic.png'); // You can replace this with the user's actual profile picture path

                const userData = `Email: ${email}, Password: ${password}, First Name: ${firstName}, Last Name: ${lastName}\n`;
                await saveToFile(userData);

                verificationModal.style.display = 'none'; // Close verification modal

                // Optionally, you can hide the success message after a few seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000); // Hide after 3 seconds
            }, 1500); // Wait for 1.5 seconds to display success message before saving
        } else {
            alert("Incorrect verification code.");
        }
    };
});

// Handle the sign-in form submission
const signInForm = document.getElementById('signInForm'); // Correct form selector
signInForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission that would reload the page

    // Collect input values from the email and password fields
    const emailInput = document.getElementById('signInEmail');
    const passwordInput = document.getElementById('signInPassword');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Log the email and password to debug
    console.log("Entered email:", email, "Length:", email.length);
    console.log("Entered password:", password, "Length:", password.length);

    // Ensure the password field is not empty
    if (password === '') {
        alert("Password cannot be empty!");
        return;
    }

    // Read user data from the file
    const fileContent = await readFromFile();
    if (fileContent) {
        console.log("File content:", fileContent); // Log content to debug

        // Parse the user data from the file content
        const users = fileContent.split('\n').map(line => {
            const parts = line.split(',');
            if (parts.length < 2) {
                return null; // Skip invalid lines
            }
            const savedEmail = parts[0]?.split(': ')[1]?.trim();
            const savedPassword = parts[1]?.split(': ')[1]?.trim();

            return savedEmail && savedPassword ? { email: savedEmail, password: savedPassword } : null;
        }).filter(user => user !== null); // Remove invalid users

        console.log("Parsed users:", users); // Debug parsed users

        // Compare entered email and password with the saved data
        const userExists = users.some(user => {
            console.log("Comparing:", user.email.toLowerCase(), email.toLowerCase(), user.password, password); // Debug comparison
            return user.email.toLowerCase() === email.toLowerCase() && user.password === password;
        });

        if (userExists) {
            alert("Sign in successful!");
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert("Invalid email or password.");
        }
    } else {
        alert("Failed to load user data.");
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
