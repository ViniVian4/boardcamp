import express from 'express';
import { getGames, insertGame } from '../controllers/gamesController';
import verifyGame from '../middlewares/gamesMiddleware';

const router = express.Router();

router.get('/games', getGames);
router.post('/games', verifyGame, insertGame);

export default router;