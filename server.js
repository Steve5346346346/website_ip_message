const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Налаштування для обробки статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Парсинг JSON-даних
app.use(express.json());

// Обробка POST-запитів на /api/submit
app.post('/api/submit', (req, res) => {
    const data = req.body;
    console.log('Received data:', data); // Виведення даних у консоль сервера
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Data saved successfully');
    });
});

// Обробка POST-запитів на /api/submit-input
app.post('/api/submit-input', (req, res) => {
    const inputData = req.body;
    console.log('Received input data:', inputData); // Виведення даних у консоль сервера
    fs.appendFile('input-data.json', JSON.stringify(inputData, null, 2) + '\n', (err) => {
        if (err) {
            console.error('Error saving input data:', err);
            return res.status(500).send('Error saving input data');
        }
        res.status(200).send('Input data saved successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
