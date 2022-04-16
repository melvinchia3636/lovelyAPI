const express = require("express");
const app = express();

const cors = require("cors");
// import cors from cors;

let users = [
  {
    id: 1,
    name: "John Doe",
    age: 87,
    email: "johndoe@thecodeblog.net",
    phone: "0123456789",
  },
  {
    id: 2,
    name: "Jiahuiiiii",
    age: 60,
    email: "jiahuiiii@gmail.net",
    phone: "0123456789",
  },
  {
    id: 3,
    name: "Henry Phang",
    age: 87,
    email: "henry@thecodeblog.net",
    phone: "0128788787",
  }
]

app.use(express.json());
app.use(cors());

app.get("/users/list", (req, res) => {
  res.send(users);
})

app.post("/users/add", (req, res) => {
  const { name, age, email, phone } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    age,
    email,
    phone
  }
  users.push(newUser);
  res.send(users);
})

app.delete('/users/delete/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(user => user.id !== parseInt(id));
  res.send(users);
})

app.get('/users/search', (req, res) => {
  const { q } = req.query;
  if (q) {
    result = users.filter(user => user.name.toLowerCase().includes(q.toLowerCase()));
    res.send(result);
  }
  res.send([]);
})

app.listen(3001, () => {
  console.log("App is listening on port 3001");
})