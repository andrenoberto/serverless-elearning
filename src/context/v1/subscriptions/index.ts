import Express from 'express';

import {SubscriptionControllerValidator} from '@api/v1/subscriptions/validator';
import {Validators} from '@libs/validators';
import {SubscriptionController} from './controller';

const controller = new SubscriptionController();
const router = Express.Router();

router.delete('/', SubscriptionControllerValidator.batchDeleteSubscription, (req, res) => {
  controller.batchDelete(req, res);
});

router.delete('/:uuid', (req, res) => {
  controller.delete(req, res);
});

router.get('/', (req, res) => {
  controller.get(req, res);
});

router.get('/:uuid', (req, res) => {
  controller.find(req, res);
});

router.get('/next/:exclusiveStartKey', (req, res) => {
  controller.get(req, res);
});

router.post('/', SubscriptionControllerValidator.putSubscription, (req, res) => {
  controller.put(req, res);
});

router.post('/down', Validators.tableManagement, Validators.masterKey, (req, res) => {
  controller.down(req, res);
});

router.post('/up', Validators.tableManagement, Validators.masterKey, (req, res) => {
  controller.up(req, res);
});

router.put('/', SubscriptionControllerValidator.updateSubscription, (req, res) => {
  controller.update(req, res);
});

export default router;
