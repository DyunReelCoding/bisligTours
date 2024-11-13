document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate an authentication process (replace with actual validation logic)
    if (email === 'user@example.com' && password === 'password123') {
        // Simulate successful login
        const userName = 'John Doe';  // Example user name
        const userProfilePic = '../images/logo.png';  // Example profile picture path

        // Store the user info in localStorage (or sessionStorage)
        localStorage.setItem('userName', userName);
        localStorage.setItem('userProfilePic', userProfilePic);

        // Close the modal
        document.getElementById('signInModal').style.display = 'none';

        // Redirect to login.html (or another page)
        window.location.href = 'login.html'; // Adjust to the desired page
    } else {
        // If email and password don't match, display an error
        alert('Invalid email or password');
    }
});

// Close the modal when the close button is clicked
document.getElementById('closeSignInModal').addEventListener('click', function() {
    document.getElementById('signInModal').style.display = 'none';
});
