const express = require('express');
const app = express();
const prisma = require('@prisma/client');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/allUsers', async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/house/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const house = await prismaClient.house.findUnique({
        where: { id: parseInt(id) },
        });
        if (!house) {
        return res.status(404).json({ error: 'House not found' });
        }
        res.status(200).json(house);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});