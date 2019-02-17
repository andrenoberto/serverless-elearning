import * as Express from 'express';
import V1 from './context/v1';

const router = Express.Router();

router.use('/v1', V1);

export default router;
