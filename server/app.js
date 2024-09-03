if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(require('./routes'));

module.exports = app;