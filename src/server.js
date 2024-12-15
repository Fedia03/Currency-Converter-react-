const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL connected');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync().then(() => {
    console.log('Tables created!');
}).catch(err => {
    console.error('Error creating tables:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Currency Converter API!');
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User created', user: newUser });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed' });
        console.error('Registration error:', err);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});