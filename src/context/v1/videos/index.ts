import Express from 'express';

import {VideoController} from '@api/v1/videos/controller';
import {Validators} from '@libs/validators';

const controller = new VideoController();
const router = Express.Router();

router.post('/down', Validators.tableManagement, Validators.masterKey, (req, res) => {
  controller.down(req, res);
});

router.post('/up', Validators.tableManagement, Validators.masterKey, (req, res) => {
  controller.up(req, res);
});

export default router;
