import connection from '../db/database.js';

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        let customersList;

        if (cpf) {
            customersList = await connection.query(`SELECT * FROM customers WHERE cpf ILIKE $1`, [`${cpf}%`]); 
        } else {
            customersList = await connection.query(`SELECT * FROM customers`);
        }

        res.status(200).send(customersList.rows);
        return;
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function getCustomer (req, res) {
    const { id } = req.params;

    try {
        const customer = connection.query(`SELECT * FROM customers WHERE id=$1`, [id]);

        if (customer.rows.length === 0) {
            req.sendStatus(404);
            return;
        }

        res.status(200).send(customer.rows[0]);
        return;
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function insertCustomer (req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
        [name, phone, cpf, birthday]);

        res.sendStatus(201);
        return;
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function editCustomer (req, res) {
    const { id } = req.params;
	const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
        [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
        return;
    } catch (err) {
        res.status(500).send(err);
    }
}