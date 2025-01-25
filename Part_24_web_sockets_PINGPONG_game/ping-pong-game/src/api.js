const express = require('express');
const path = require('path');
const logger = require('./logger');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    logger.info('Serving index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;