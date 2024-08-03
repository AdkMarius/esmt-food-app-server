import {authRoutes} from "./routes/auth";
import { productsRoutes } from "./routes/products";
import {ordersRoutes} from "./routes/orders";
import {usersRoutes} from "./routes/users";
import {orderItemsRoutes} from "./routes/order-items";
import {categoriesRoutes} from "./routes/categories";
import { Request, Response, NextFunction} from "express";
import {accountRoutes} from "./routes/account";

const express = require('express');

export const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware to parse JSON payloads
app.use(express.json());

// Middleware to parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use('/api/products', productsRoutes);

app.use('/api/orders', ordersRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/order-items', orderItemsRoutes);

app.use('/api/categories', categoriesRoutes);

app.use('/api/balance', accountRoutes);