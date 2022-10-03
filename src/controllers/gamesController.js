import connection from '../db/database.js';

async function getGames(req, res) {    
    const { name } = req.query;
    
    try {
        let gamesList;

        if (name) {
            gamesList = await connection.query(`SELECT * FROM games WHERE LOWER(name) LIKE $1`, [`${name.toLowerCase()}%`]);
        } else {
            gamesList = await connection.query(`SELECT * FROM games`);
        }

        res.status(200).send(gamesList.rows);
    } catch (err) {
        res.status(500).send(err);   
    }
}

async function insertGame (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
        [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    }
}

export { getGames, insertGame };