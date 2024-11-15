const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = 'C:/Users/Jonriel Baloyo/OneDrive/Dokumen/BSIT 4/IT 114/bislig-tours/user_info/user_info.txt';

const app = express();
app.use(bodyParser.json());

// Signup route to save user data
app.post('/signup', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const userData = `Email: ${email}, Password: ${password}, First Name: ${firstName}, Last Name: ${lastName}\n`;

    fs.appendFile(path, userData, (err) => {
        if (err) return res.status(500).send('Error saving user data');
        res.send('Signup successful');
    });
});

// Signin route to verify user data
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading user data');

        const users = data.split('\n').map(line => {
            const [savedEmail, savedPassword] = line.split(',').map(item => item.split(': ')[1]);
            return { email: savedEmail, password: savedPassword };
        });

        const userExists = users.some(user => user.email === email && user.password === password);
        if (userExists) {
            res.send('Signin successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
