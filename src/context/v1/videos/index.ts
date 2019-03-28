import Express from 'express';

import {VideoController} from '@api/v1/videos/controller';
import {VideoControllerValidator} from '@api/v1/videos/validator';

const controller = new VideoController();
const router = Express.Router();

router.post('/down', VideoControllerValidator.tableManagementVideo, (req, res) => {
  controller.down(req, res);
});

router.post('/up', VideoControllerValidator.tableManagementVideo, (req, res) => {
  controller.up(req, res);
});

export default router;
