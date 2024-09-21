import express from 'express';

import authRouter from './auth.route.js';
import userRouter from './user.route.js';

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter )
indexRouter.use('/user', userRouter )

export default indexRouter;