const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let users = [
  { id: 1, name: 'Carmela', email: 'mela@gmail.com', age: 25, salary: 25000 },
  { id: 2, name: 'Joseph', email: 'joe@yahoo.com', age: 30, salary: 45000 },
  { id: 3, name: 'James', email: 'james@msn.com', age: 35, salary: 30000 },
  { id: 4, name: 'John', email: 'john@gmail.com', age: 40, salary: 25000 },
  { id: 5, name: 'Frank', email: 'frank@yahoo.com', age: 45, salary: 45000 },
  { id: 6, name: 'Alex', email: 'alex@msn.com', age: 21, salary: 33000 },
];

app.get('/', (req, res) => {
  res.send(
    'Available routes: GET /api/users, GET /api/users/:id, POST /api/users, DELETE /api/delete/:id'
  );
});

// GET /api/users: Returns all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET /api/users/:id: Fetches a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// GET /api/users/:params: Retrieves and displays parameters
app.get('/api/users/:id/params', (req, res) => {
  res.json(req.params);
});

// POST /api/users: Adds a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1; // Generate new ID
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE /api/delete/:id: Deletes a user by ID
app.delete('/api/delete/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send(`User with id ${userId} deleted`);
  } else {
    res.status(404).send('User not found');
  }
});

// Listen on the specified port
app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
