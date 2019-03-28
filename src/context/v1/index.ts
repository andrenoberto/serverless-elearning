import Express from 'express';

import Subscriptions from '@api/v1/subscriptions';
import UserGroups from '@api/v1/user-groups';
import Videos from '@api/v1/videos';

const router = Express.Router();

router.use('/subscriptions', Subscriptions);
router.use('/user-groups', UserGroups);
router.use('/videos', Videos);

export default router;
