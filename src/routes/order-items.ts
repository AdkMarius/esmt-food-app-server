import { insertOrderItems } from "../controllers/order-items";

const express = require('express');

export const orderItemsRoutes  = express.Router();

orderItemsRoutes.post('/', insertOrderItems);