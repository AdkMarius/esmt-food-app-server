import {NextFunction, Request, Response} from "express";
import {supabase} from "../lib/supabase";
import logger from "../logger";
import {InsertTables, Tables} from "../lib/types";

export const insertOrderItems = async (req: Request, res: Response, next: NextFunction) => {
    const body: InsertTables<'order_items'>[] = req.body;

    try {
        const { data, error } = await supabase
            .from('order_items')
            .insert(body)
            .select();

        if (error) {
            logger.error(`Error occurred when inserting order items: ${JSON.stringify(error)}`);
            return res.status(500).json({ message: 'Error occurred when inserting order items' });
        }

        return res.status(201).json({
            data,
            message: 'Order items created successfully'
        });
    } catch (error) {
        logger.error(`Invalid request data: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};