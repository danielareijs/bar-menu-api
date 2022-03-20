require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3333;
const db = require('./queries');
const {authenticate} = require('./middleware');

app.use(cors());
app.use(express.json());


//AUTH 
app.post('/login', async (req, res) => {
  console.log('In server, login', req.body)
    const { username, password } = req.body;
  
    try {
      const user = await db.getUserByUsername(username);
  
      if (!user) {
        return res
        .status(401)
        .send({ error: 'Invalid username' });
      }
    
      if (password !== user.password) {
        return res
        .status(401)
        .send({ error: 'Wrong password' });
      }
    
      const token = jwt.sign({
        id: user.id,
        username: user.username
      }, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'));
      
      res.send({ token });
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  });
  
  app.get('/session', authenticate, async (req, res) => {
    const { username } = req.user;
  
    res.status(200).send({
      message: `You are authenticated as ${username}`
    });
  });

  // CATEGORIES
  app.get('/categories', async (req, res) => {
    const categories = await db.getCategories();
    res.send(categories)
  })

app.listen(port, console.log(`Listening on request on port ${port}`))