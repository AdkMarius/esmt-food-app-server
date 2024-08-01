import {signIn, signUp} from "../controllers/auth";

const express = require('express');

export const authRoutes  = express.Router();

authRoutes.post('/sign-in', signIn);

authRoutes.post('/sign-up', signUp);