import connection from '../db/database.js';
import customerSchema from '../schemas/customerSchema.js';

async function verifyCustomer(req, res, next) {
    const newCustomer = req.body;

    const validation = customerSchema.validate(newCustomer, {abortEarly: true});

    if (validation.error) {
        res.status(400).send(validation.error);
        return;
    }

    const cpf = await connection.query(`SELECT * FROM customers WHERE cpf=$1`,
    [newCustomer.cpf]);

    if (cpf.rowCount !== 0) {
        res.sendStatus(409);
        return;
    }    
    
    next();
}

export default verifyCustomer;