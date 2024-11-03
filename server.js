const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('*', (req, res) => {
    console.log(path.join(__dirname, "build", "index.html"));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
