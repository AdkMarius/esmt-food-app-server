import {
    createProduct,
    deleteProduct,
    readAllProduct,
    readProductById,
    updateProduct,
    readDayMenuProduct,
    readPopularProducts
} from "../controllers/products";

const express = require('express');
export const productsRoutes  = express.Router();

productsRoutes.get('/list', readAllProduct)

productsRoutes.post('/create', createProduct);

productsRoutes.get('/popular', readPopularProducts);

productsRoutes.get('/day-menu', readDayMenuProduct);

productsRoutes.put('/:id', updateProduct);

productsRoutes.get('/:id', readProductById);

productsRoutes.delete('/:id', deleteProduct);
