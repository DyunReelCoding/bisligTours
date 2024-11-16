// Password Guidelines
const passwordField = document.getElementById('password');
const minLength = document.getElementById('minLength');
const uppercase = document.getElementById('uppercase');
const number = document.getElementById('number');
const specialChar = document.getElementById('specialChar');
const signUpBtn = document.getElementById('signUpBtn');

// Function to validate password
function validatePassword() {
    const password = passwordField.value;
    
    // Check for at least 8 characters
    const validLength = password.length >= 8;
    minLength.style.color = validLength ? 'green' : 'red';
    
    // Check for at least one uppercase letter
    const validUppercase = /[A-Z]/.test(password);
    uppercase.style.color = validUppercase ? 'green' : 'red';
    
    // Check for at least one number
    const validNumber = /\d/.test(password);
    number.style.color = validNumber ? 'green' : 'red';
    
    // Check for at least one special character
    const validSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    specialChar.style.color = validSpecialChar ? 'green' : 'red';

    // Enable or disable the submit button based on validation
    signUpBtn.disabled = !(validLength && validUppercase && validNumber && validSpecialChar);
}

// Listen for password input changes and validate
passwordField.addEventListener('input', validatePassword);

// Handle the sign-up form submission
const signUpForm = document.querySelector('#signUpForm');
signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect input values
    const firstName = event.target[0].value.trim();
    const lastName = event.target[1].value.trim();
    const email = event.target[2].value.trim();
    const password = event.target[3].value.trim();

    // Check if password meets all criteria before proceeding
    if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        alert('Password must meet all criteria.');
        return;
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
