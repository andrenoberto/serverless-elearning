import * as Express from 'express';

import {SubscriptionControllerValidator} from '@api/v1/subscriptions/validator';
import {SubscriptionController} from './controller';

const controller = new SubscriptionController();
const router = Express.Router();

router.get('/', (req, res) => {
  controller.get(req, res);
});

router.get('/:uuid', (req, res) => {
  controller.find(req, res);
});

router.post('/', SubscriptionControllerValidator.newSubscription, (req, res) => {
  controller.add(req, res);
});

router.post('/down', SubscriptionControllerValidator.tableManagementSubscription, (req, res) => {
  controller.down(req, res);
});

router.post('/up', SubscriptionControllerValidator.tableManagementSubscription, (req, res) => {
  controller.up(req, res);
});

export default router;
