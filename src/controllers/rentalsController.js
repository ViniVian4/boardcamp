import connection from '../db/database.js';
import dayjs from 'dayjs';

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        const rentals = await connection.query(
            `SELECT rentals.*, jsonb_build_object('name', customers.name, 'id', customers.id) AS customer,
            jsonb_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS games
            FROM rentals 
            JOIN customers ON rentals."customerId"=customers.id
            JOIN games ON rentals."gameId"=games.id
            JOIN categories ON categories.id = games."categoryId"
            ${customerId || gameId ? 'WHERE ' : ''}
            ${customerId ? `customers.id=${customerId} ` : ''}
            ${customerId && gameId ? 'AND ' : ''}
            ${gameId ? `games.id=${gameId} ` : ''}`);

        let ListRentals = rentals.rows;

        res.status(200).send(ListRentals);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function postNewRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
        const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
        const rentals = await connection.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId]);
        const rentedGames = rentals.rows.filter((row) => row.returnDate === null);

        if (customer.rowCount === 0 ||
            game.rowCount === 0 ||
            rentedGames.length >= game.rows[0].stockTotal) {
            res.sendStatus(400);
            return;
        }

        const rentDate = dayjs().format("YYYY-MM-DD");
        const originalPrice = Number(daysRented) * Number(game.rows[0].pricePerDay);

        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function completeRental(req, res) {
    const { rental } = res.locals;
    const { rentDate } = rental.rows[0];
    const returnDate = dayjs().format('YYYY-MM-DD');
    console.log('a');

    try {
        const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [rental.rows[0].gameId]);
        const delayFee = (parseInt(dayjs().format('D')) - (rentDate.getDate() + rental.rows[0].daysRented))
            * game.rows[0].pricePerDay;

        await connection.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`, [returnDate, delayFee, req.params.id]);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteRental(req, res) {
    try {
        await connection.query(`DELETE FROM rentals WHERE id=$1`, [req.params.id]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
}