import Express from 'express';

import {VideoController} from '@api/v1/videos/controller';

const controller = new VideoController();
const router = Express.Router();

export default router;
