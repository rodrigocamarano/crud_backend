import { Router } from 'express';
import knex from './knex.route';

const router = Router();

router.use('/knex', knex);
export default router;
