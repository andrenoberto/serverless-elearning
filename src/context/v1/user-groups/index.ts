import * as Express from 'express';

import {UserGroupController} from '@api/v1/user-groups/controller';
import {UserGroupControllerValidator} from '@api/v1/user-groups/validator';

const controller = new UserGroupController();
const router = Express.Router();

export default router;
