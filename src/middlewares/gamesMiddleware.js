import connection from '../db/database.js';
import gameSchema from '../schemas/gameSchema.js';

async function verifyGame(req, res, next) {
    const newGame = req.body;
    console.log("a");

    const validation = gameSchema.validate(newGame, { abortEarly: true });
    if (validation.error) {
        res.status(400).send(validation.error);
        return;
    }

    try {
        if (newGame.categoryId) {
            const category = await connection.query(
                `SELECT * FROM categories WHERE id=$1`, [newGame.categoryId]
            );

            if (category.rows.length === 0) {
                res.sendStatus(400);
                return;
            }
        }

        const name = await connection.query(
            `SELECT * FROM games WHERE LOWER(name)=$1`, [newGame.name.toLowerCase()]
        );
        if (name.rows.length !== 0) {
            res.sendStatus(409);
            return;
        }
    } catch (err) {
        res.status(500).send(err);
    }

    next();
}

export default verifyGame;