import { readUserBalance, updateUserBalance, createUserBalance } from "../controllers/account";

const express = require('express');

export const accountRoutes  = express.Router();

accountRoutes.post('', createUserBalance);

accountRoutes.get('/:id', readUserBalance);

accountRoutes.put('/:id', updateUserBalance);
