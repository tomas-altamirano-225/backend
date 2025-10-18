const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => console.log(`Servidor Iniciado en el puerto ${port}`))

app.get('/api/saludo', (req, res) => {
    res.send('Hola Mundo');
})