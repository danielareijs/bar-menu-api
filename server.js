require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;
const db = require('./queries');

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
        username: user.username,
        name: user.name,
      }, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'));
    
      res.send({ token });
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  });
  
  app.get('/session', async (req, res) => {
    const token = req.headers['x-auth-token'];
  
    try {
      const payload = jwt.verify(token, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'));
      res.send({ message: `You are authenticated as ${payload.username}` })
    } catch (error) {
      res.status(401).send({
        error: 'Invalid token',
      });
    }
  });


app.listen(port, console.log(`Listening on request on port ${port}`))