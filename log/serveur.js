require('dotenv').config({ path: './my-mongodb-server/base.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/user'); // Assurez-vous d'avoir ce modèle

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..'))); // Servir les fichiers statiques à partir du répertoire racine
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Route pour servir le fichier HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Route d'inscription
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

// Route de connexion
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});