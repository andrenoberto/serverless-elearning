import Express from 'express';

import {UserGroupController} from '@api/v1/user-groups/controller';
import {UserGroupControllerValidator} from '@api/v1/user-groups/validator';

const controller = new UserGroupController();
const router = Express.Router();

router.delete('/', UserGroupControllerValidator.batchDeleteUserGroup, (req, res) => {
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

router.post('/', UserGroupControllerValidator.putUserGroup, (req, res) => {
  controller.put(req, res);
});

router.post('/down', UserGroupControllerValidator.tableManagementUserGroup, (req, res) => {
  controller.down(req, res);
});

router.post('/up', UserGroupControllerValidator.tableManagementUserGroup, (req, res) => {
  controller.up(req, res);
});

router.put('/', UserGroupControllerValidator.updateUserGroup, (req, res) => {
  controller.update(req, res);
});

export default router;
