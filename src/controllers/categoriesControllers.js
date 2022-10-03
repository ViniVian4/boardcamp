import connection from '../db/database.js';

async function getCategories(req, res) {
    try {
        const listCategories = await connection.query(`SELECT * FROM categories`);
        return res.status(200).send(listCategories.rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function postCategories(req, res) {
    let { name } = req.body;

    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
        res.sendStatus(201);
        return;
    } catch (err) {
        res.status(500).send(err);
    }
}

export { getCategories, postCategories }