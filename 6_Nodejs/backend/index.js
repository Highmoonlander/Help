const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.get('/getItems', async (req, res) => {
  try {

    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user && user.password === password) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
  
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
  
      if (existingUser) {
        return res.status(409).send('Username already taken');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send('Error during registration');
    }
  });