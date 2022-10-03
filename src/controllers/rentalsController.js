import connection from '../db/database.js';

export async function getRentals(req, res) {
    try {
        const rentals = await connection.query(`SELECT rentals.*,
            customers.id AS customer_id,
            customers.name AS customer_name,
            games.id AS game_id,
            games.name AS game_name,
            categories.id AS category_id,
            categories.name AS category_name FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id;`);

        let rentalsList = rentals.row;

        res.status(200).send(rentalsList);
    } catch (err) {
        res.status(500).send(err);
    }
}