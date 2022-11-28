const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");

const cors = require("cors");
// import cors from cors;

let users = Array(1000).fill(0).map((_, i) => ({
  id: i,
  avatar: faker.internet.avatar(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  jobTitle: faker.name.jobTitle(),
  jobArea: faker.name.jobArea(),
  jobType: faker.name.jobType(),
  status: faker.random.arrayElement(['active', 'offline', 'idle'])
}))

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
    return;
  }
  res.send([]);
})

app.listen(3001, () => {
  console.log("App is listening on port 3001");
})