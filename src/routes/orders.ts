import {
    createOrder,
    deleteOrder,
    readAllOrder,
    readOrderById,
    readOrderDetails,
    updateOrder,
    readAllOrderByUserId,
    readAllOrdersByStatus
} from "../controllers/orders";

const express = require('express');
export const ordersRoutes  = express.Router();

ordersRoutes.get('/', readAllOrdersByStatus);

ordersRoutes.get('/list', readAllOrder)

ordersRoutes.post('/create', createOrder);

ordersRoutes.get('/user-orders', readAllOrderByUserId);

ordersRoutes.get('/details/:id', readOrderDetails);

ordersRoutes.put('/:id', updateOrder);

ordersRoutes.get('/:id', readOrderById);

ordersRoutes.delete('/:id', deleteOrder);

