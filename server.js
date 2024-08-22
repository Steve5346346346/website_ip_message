const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // Додаємо middleware для парсингу JSON

app.post('/api/submit', (req, res) => {
    const data = req.body;
    console.log("Received data:", data); // Вивести дані на серверній консолі
    res.status(200).send('Data received');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
