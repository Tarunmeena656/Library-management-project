import express from 'express';
import passport from 'passport';

import {signin, signup } from '../controllers/user.controller.js'

const authRouter = express.Router();

authRouter.post('/signup', signup )
authRouter.post('/signin', passport.authenticate('local', { session: false}), signin )



export default authRouter;