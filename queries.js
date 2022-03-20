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

const getCategories = () => {
    const sql = 'SELECT * FROM categories';
    return pool.query(sql)
    .then(res => res.rows);
}


module.exports = {
    getUserByUsername,
    getCategories
}