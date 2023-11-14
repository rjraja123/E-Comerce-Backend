const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["https://rjemartstore.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

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

app.listen(5001, () => {
  console.log(`Server is running on port ${5001}`);
});

module.exports = app;
