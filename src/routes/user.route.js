import express from 'express';
import passport from 'passport';

import { deleteUser, getById, show, update } from '../controllers/user.controller.js';
import { hasCheckRole } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/show',passport.authenticate('local', {session: false}), show)
userRouter.get('/:_id',passport.authenticate('local', {session: false}), getById)
userRouter.get('/:_id',passport.authenticate('local', {session: false}), hasCheckRole(["user", "admin"]), deleteUser)
userRouter.get('/:_id',passport.authenticate('local', {session: false}), hasCheckRole(["user", "admin"]), update)

export default userRouter;