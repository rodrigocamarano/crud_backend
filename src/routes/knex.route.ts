import { Router } from 'express';

import { select, insert, update, remove } from '../controllers/knex.controller';
import { select as validateSelect, insert as validateInsert, update as validateUpdate, remove as validateRemove } from '../validators/validator';

const router = Router();

router.route('/:table/:id?').get(validateSelect, select);
router.route('/:table').post(validateInsert, insert);
router.route('/:table').put(validateUpdate, update);
router.route('/:table/:id').delete(validateRemove, remove);

export default router;
