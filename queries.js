const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'menu',
    password: 'password',
    port: 5432,
})

const getUserByUsername = (username) => {
    const sql = 'SELECT * FROM users WHERE username = $1';
    return pool.query(sql, [username])
    .then(res => res.rows[0])
}

// CATEGORIES

const getCategories = () => {
    const sql = 'SELECT * FROM categories';
    return pool.query(sql)
    .then(res => res.rows);
}

const createCategory = (category) => {
    const sql = 'INSERT INTO categories (name) VALUES ($1) RETURNING id';
    return pool.query(sql, [category])
    .then(res => res.rows[0])
}

// DRINKS
const getDrinkById = (id) => {
    const sql = 'SELECT * FROM drinks WHERE id = $1';
    return pool.query(sql, [id])
    .then(res => res.rows[0])
}

const getDrinksByCategory = (category) => {
    const sql = 'SELECT * FROM drinks WHERE category = $1';
    return pool.query(sql, [category])
    .then(res => res.rows)
}

const createDrink = (drink) => {
    console.log(drink)
    const sql = `INSERT INTO drinks (name, category, price, ingredients, volume, available)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

    return pool.query(sql, [drink.name, drink.category, drink.price, drink.ingredients, drink.volume, true])
    .then(res => res.rows[0])
}

const updateDrink = (id, drink) => {
    const sql = `UPDATE drinks 
    SET name = $1, category = $2, price = $3, ingredients = $4, volume = $5, available = $6
    WHERE id = $7`
    return pool.query(sql, [drink.name, drink.category, drink.price, drink.ingredients, drink.volume, drink.available, id])
    .then(res => res.rows[0])
}

const deleteDrink = (id) => {
    const sql = `DELETE FROM drinks WHERE id = $1 RETURNING id`;
    return pool.query(sql, [id])
    .then(res => res.rows[0])
}

module.exports = {
    getUserByUsername,
    getCategories,
    getDrinkById,
    getDrinksByCategory,
    createCategory,
    createDrink,
    updateDrink,
    deleteDrink
}