'use strict'
const express = require('express')
const app = express()
const PORT = 4000
const router = require('./router')
const cors =require('cors')

app.use(cors({origin: 'http://localhost:3000', methods:['POST', 'PUT', 'GET']}))
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });