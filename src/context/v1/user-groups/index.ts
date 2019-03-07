import * as Express from 'express';

import {UserGroupController} from '@api/v1/user-groups/controller';
import {UserGroupControllerValidator} from '@api/v1/user-groups/validator';

const controller = new UserGroupController();
const router = Express.Router();

router.get('/', (req, res) => {
  controller.get(req, res);
});

router.get('/:uuid', (req, res) => {
  controller.find(req, res);
});

router.get('/next/:exclusiveStartKey', (req, res) => {
  controller.get(req, res);
});

router.post('/', UserGroupControllerValidator.putUserGroup, (req, res) => {
  controller.put(req, res);
});

router.post('/down', UserGroupControllerValidator.tableManagementSubscription, (req, res) => {
  controller.down(req, res);
});

router.post('/up', UserGroupControllerValidator.tableManagementSubscription, (req, res) => {
  controller.up(req, res);
});

export default router;
