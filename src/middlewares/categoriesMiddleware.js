import connection from '../db/database.js';

async function verifyCategoryInput(req, res, next) {
    const { body } = req;
    if (!body.name) {
      res.sendStatus(401);
      return;
    }
    try {
      const categoryVerify = await connection.query(
        'SELECT * FROM categories WHERE LOWER(name)=LOWER($1)',
        [body.name]
      );
  
      if (categoryVerify.rows.length !== 0) {
        res.sendStatus(409);
        return;
      }
      next();
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  export default verifyCategoryInput;