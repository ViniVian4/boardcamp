import connection from '../db/database.js';

export async function getGames(req, res) {
    const { name } = req.query;
    
    try {
        let gamesList;

        if (name) {
            gamesList = connection.query(`SELECT * FROM games WHERE LOWER(name) LIKE $1`);
        } else {
            gamesList = await connection.query("SELECT * FROM games;");
        }

        res.status.send(gamesList);
    } catch (err) {
        res.status(500).send(err);   
    }
}

export async function insertGame (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
        [name, image, stockTotal, categoryId, pricePerDay]);
    } catch (err) {
        res.status(500).send(err);
    }
}