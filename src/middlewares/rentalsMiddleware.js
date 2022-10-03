import connection from '../db/database.js';
import rentalSchema from '../schemas/rentalSchema.js';

export function verifyNewRental (req, res, next) {
    const newRental = req.body;

    const validation = rentalSchema.validate(newRental, {abortEarly: true});
    if (validation.error) {
        res.status(400).send(validation.error)
    }

    next();
}

export async function verifyDbRental (req, res, next) {
    try {
        const dbRental = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [req.params.id,]);

        if (dbRental.rowCount === 0) {
            res.sendStatus(404);
            return;
        }

        if (dbRental.rows[0].returnDate) {
            res.sendStatus(400);
            return;
        }

        res.locals.rental = dbRental;
        next();
    } catch (err) {
        res.status(500).send(err);
    }
}