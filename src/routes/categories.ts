import { readAllCategories } from "../controllers/categories";

const express = require('express');

export const categoriesRoutes  = express.Router();

categoriesRoutes.get('/', readAllCategories);