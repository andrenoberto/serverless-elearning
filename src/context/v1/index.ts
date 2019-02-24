import * as Express from 'express';

import Subscriptions from '@api/v1/subscriptions';

const router = Express.Router();

router.use('/subscriptions', Subscriptions);

export default router;
