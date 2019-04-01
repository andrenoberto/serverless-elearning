import Express from 'express';

import {VideoController} from '@api/v1/videos/controller';
import {Validators} from '@libs/validators';

const controller = new VideoController();
const router = Express.Router();

router.get('/', (req, res) => {
  controller.get(req, res);
});

router.get('/:uuid', (req, res) => {
  controller.find(req, res);
});

router.get('/sign', (req, res) => {
  controller.put(req, res);
});

router.post('/down', Validators.tableManagement, Validators.masterKey, (req, res) => {
  controller.down(req, res);
});

router.post('/up', Validators.tableManagement, Validators.masterKey, (req, res) => {
  controller.up(req, res);
});

export default router;
