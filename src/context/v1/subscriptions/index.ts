import * as Express from 'express';

import {SubscriptionController} from './controller';

const controller = new SubscriptionController();
const router = Express.Router();

router.get('/', (req, res) => {
  controller.get(req, res);
});

router.get('/:uuid', (req, res) => {
  controller.find(req, res);
});

export default router;
