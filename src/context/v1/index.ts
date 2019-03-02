import * as Express from 'express';

import Subscriptions from '@api/v1/subscriptions';
import UserGroups from '@api/v1/user-groups';

const router = Express.Router();

router.use('/subscriptions', Subscriptions);
router.use('/user-groups', UserGroups);

export default router;
