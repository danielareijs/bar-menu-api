require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT
const db = require('./queries');
const {authenticate} = require('./middleware');
const { Pool } = require('pg');

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

  app.post('/categories', async (req, res) => {
    const category = await db.createCategory(req.body)
    res.send(category);
  })

  app.delete('/categories/:id', async (req, res) => {
    const id = req.params.id
    try {
      const result = await db.deleteCategory(id);
      res.send(result);
    }catch(err){
      res.status(500).send({error: err.massage})
    }
  })

  app.put('/categories/:id', async (req, res) => {
    console.log('In server: ', req);
    const category = await db.updateCategory(req.params.id, req.body.main)
    res.send(category);
  })

  // CATEGORY DRINKS 
  app.get('/:category/drinks', async (req, res) => {
    const category = req.params.category;
    const drinks = await db.getDrinksByCategory(category);
    res.send(drinks);
  })

  app.post('/:category/drinks', (req, res) => {
    const result = db.addDrinkToCategory(req.params.category, req.body.drink)
    res.send(result);
  })

  app.delete('/:category/drinks/:id', async (req, res) => {
    const result = await db.removeDrinkFromCategory(req.params.category, req.params.id);
    res.send(result);
  })

   //DRINKS

  app.get('/drinks', async (req, res) => {
    const drinks = await db.getDrinks();
    res.send(drinks);
  })

  app.get('/drinks/:id', async (req, res) => {
    const id = req.params.id;
    const drink = await db.getDrinkById(id);
    res.send(drink);
  })

  app.put('/drinks/:id', async (req, res) => {
    const id = req.params.id;
    const drink = req.body;
    const result = await db.updateDrink(id, drink)
    res.send(drink);
  })

  app.post('/drinks', async (req, res) => {
    const drink = await db.createDrink(req.body.drink)
    res.send(drink)
  }) 

  app.delete('/drinks/:id', async (req, res) => {
    const id = req.params.id;

    await db.removeDrinkFromCategories(id);
    const drink = await db.deleteDrink(id);
    res.send(drink)
  })

  

  

app.listen(port || 3333, console.log(`Listening on request on port ${port}`))