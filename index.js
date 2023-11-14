// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


const signup = require("./src/signup");
const login = require("./src/login");

app.post("/signup", signup);
app.post("/login", login);

app.get("/", async (req, res) => {
  res.json("Hello!\n how are you?");
});

app.get("/signup", (req, res) => {
  res.json("Hello Word");
});

app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
});

module.exports = app;
