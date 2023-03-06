"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./router");
const cors = require("cors");
const session = require("express-session");
const path = require('path')
app.use(
  session({
    name: "uid",
    secret: "superdupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);
app.use(express.static(path.join(__dirname, 'build')));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
