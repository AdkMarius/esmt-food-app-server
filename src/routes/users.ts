import {readUserDetails, updateInfoUser, deleteUser} from "../controllers/users";

const express = require('express');
export const usersRoutes  = express.Router();

usersRoutes.get('/:id', readUserDetails)

usersRoutes.put('/:id', updateInfoUser);

usersRoutes.delete('/:id', deleteUser);

