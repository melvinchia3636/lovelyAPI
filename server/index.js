const express = require("express");
const app = express();

const cors = require("cors");
// import cors from cors;

app.use(express.json());
app.use(cors());

app.post("/sum", (req, res) => {
  const numbers = req.body.numbers;
  console.log(req.body);
  const sum = numbers.reduce((acc, curr) => acc + curr);
  res.send(`The sum of the numbers is ${sum}`);
})

app.post("/multiply", (req, res) => {
  const numbers = req.body.numbers;
  const product = numbers.reduce((a, b) => a * b);
  res.send(`The product of the numbers is ${product}`);
})

app.all("/lmao", (req, res) => {
  res.send("lmao");
})

/* app.method('/route', (req, res) => {
  // do something
  res.send(result);
}) */

app.get("/book/:id/page/:page", (req, res) => {
  console.log(req.params);
  res.send(`The id of the book you're requesting is ${req.params.id} and the page is ${req.params.page}`);
})

app.listen(3001, () => {
  console.log("App is listening on port 3001");
})