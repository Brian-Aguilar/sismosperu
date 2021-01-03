const express = require("express");
require('dotenv').config();

// Moongose config
const { dbConnection } = require('./api/database/config');
dbConnection();

const routeAPI = require("./api/index");
const mainTest = require("./test/index");

const app = express();
const port = process.env.CUSTOM_PORT || process.env.PORT;

app.use(express.json());

app.use('/api/v1', routeAPI);

// Test
app.get("/test/", mainTest);

app.use( (req, res, next) => {
  res.status(404).json({
    msg: 'error'
  });
});


app.listen(port, ()=> {
  console.log(`Puerto prendido en: ${port}`)
})
