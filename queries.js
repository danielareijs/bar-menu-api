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
    const sql = `SELECT * FROM categories ORDER BY name`;
    return pool.query(sql)
    .then(res => res.rows)
    .catch(err => console.log(err))
}

const createCategory = (category) => {
    const sql = 'INSERT INTO categories (name, main) VALUES ($1, $2) RETURNING id';
    return pool.query(sql, [category.name, category.main])
    .then(res => res.rows[0])
    .catch(err => console.log(err))
}

const getDrinksByCategory = (category) => {
    const sql = `SELECT * FROM category_drinks AS cd
    JOIN drinks AS d ON cd.drink = d.id
    WHERE cd.category = $1`;
    return pool.query(sql, [category])
    .then(res => res.rows)
    .catch(err => err)
}

const deleteCategory = (category) => {
    const sql = `DELETE FROM categories WHERE id = $1 RETURNING id`
    return pool.query(sql, [category])
    .then(res => res.rows[0])
}

const updateCategory = (id, main) => {
    console.log('ID:', id, 'MAIN:', main)
    const sql = `UPDATE categories
    SET main = $1 WHERE id = $2`;
    return pool.query(sql, [main, id])
    .then(res => {
        console.log(res)
        return res.rows[0]
    })
}

// CATEGORY-DRINKS

const addDrinkToCategory = (category, drink) => {
    const sql = `INSERT INTO category_drinks (drink, category) VALUES ($1, $2)`;
    return pool.query(sql, [drink, category])
    .then(res => res.rows[0])
    .catch(err => err)
}

const removeDrinkFromCategory = (category, drink) => {
    const sql = `DELETE FROM category_drinks
    WHERE drink = $1 AND category = $2`;
    return pool.query(sql, [drink, category])
    .then(res => res.rows[0])
}

const removeDrinkFromCategories = (drink) => {
    const sql = `DELETE FROM category_drinks WHERE drink = $1`
    return pool.query(sql, [drink])
    .then(res => res.rows[0])
}


// DRINKS

const getDrinks = () => {
    const sql = `SELECT * FROM drinks
    ORDER BY name`;
    return pool.query(sql)
    .then(res => res.rows)
    .catch(err => console.log(err))
}
const getDrinkById = (id) => {
    const sql = `SELECT * FROM drinks 
    JOIN category_drinks ON drinks.id = category_drinks.drink
    WHERE id = $1`;
    return pool.query(sql, [id])
    .then(res => res.rows[0])
    .catch(err => console.log(err))
}

const createDrink = (drink) => {
    const sql = `INSERT INTO drinks (name, price, ingredients, volume, available)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`

    return pool.query(sql, [drink.name, drink.price, drink.ingredients, drink.volume, drink.available])
    .then(res => res.rows[0])
    .catch(err => console.log(err))
}

const updateDrink = (id, drink) => {
    const sql = `UPDATE drinks 
    SET name = $1, price = $2, ingredients = $3, volume = $4, available = $5
    WHERE id = $6`
    return pool.query(sql, [drink.name, drink.price, drink.ingredients, drink.volume, drink.available, id])
    .then(res => res.rows[0])
    .catch(err => console.log(err))
}

const deleteDrink = (id) => {
    const sql = `DELETE FROM drinks WHERE id = $1 RETURNING id`;
    return pool.query(sql, [id])
    .then(res => res.rows[0])
    .catch(err => console.log(err))
}

module.exports = {
    getUserByUsername,
    getCategories,
    getDrinks,
    getDrinkById,
    getDrinksByCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    createDrink,
    updateDrink,
    deleteDrink,
    removeDrinkFromCategory,
    removeDrinkFromCategories,
    addDrinkToCategory
}