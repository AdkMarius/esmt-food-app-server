import { Request, Response, NextFunction } from "express";

const express = require('express');

export const app = express();


app.use((req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});