import { Request, Response, NextFunction} from "express";
import { supabase } from "../lib/supabase";
import logger from "../logger";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert(req.body)
            .select();

        if (error) {
            logger.error(error);
            return res.status(500).json({ message: 'Error occurred when inserting order' });
        }

        return res.status(201).json({
            data,
            message: 'Order created successfully'
        });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const readOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = JSON.parse(req.params.id);

        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading order'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Order read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    const { data, error } = await supabase
        .from('orders')
        .update(req.body)
        .eq('id', id)
        .select();

    if (error) {
        logger.error(error);
        return res.status(500).json({message: 'Error occur while modifying order'});
    }

    return res
        .status(200)
        .json({
            data: data,
            message: 'Order read successfully'
        });
};

export const readAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*');

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading orders'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Orders read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        const { error } =  await supabase
            .from('orders')
            .delete()
            .eq('id', id);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while deleting order'});
        }

        return res
            .status(200)
            .json({
                message: 'Order deleted successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const readOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        const { data, error } =  await supabase
            .from('orders')
            .select('*, order_items(*, products(*))')
            .eq('id', id);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while deleting order'});
        }

        return res
            .status(200)
            .json({
                data,
                message: 'Order deleted successfully'
            });

    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }

};

export const readAllOrderByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.query;

    // Ensure user_id is a string
    if (typeof user_id !== 'string') {
        return res.status(400).json({ message: 'Invalid user_id parameter' });
    }

    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user_id);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading user orders'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Orders read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const readAllOrdersByStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.query;

    // Ensure user_id is a string
    if (typeof status !== 'string') {
        return res.status(400).json({ message: 'Invalid user_id parameter' });
    }

    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('status', status);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading user orders'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Orders read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};