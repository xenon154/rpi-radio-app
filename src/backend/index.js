const { exec } = require('child_process');
const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.sendFile("../web/index.html")
})