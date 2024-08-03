import {NextFunction, Request, Response} from "express";
import {supabase} from "../lib/supabase";
import logger from "../logger";

export const createUserBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('account')
            .insert(req.body)
            .select();

        if (error) {
            logger.error(error);
            return res.status(500).json({ message: 'Error occurred when inserting user balance' });
        }

        return res.status(201).json({
            data,
            message: 'User balance created successfully'
        });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const updateUserBalance = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const { data, error } = await supabase
        .from('account')
        .update(req.body)
        .eq('user_id', userId)
        .select();

    if (error) {
        logger.error(error);
        return res.status(500).json({message: 'Error occur while modifying user balance'});
    }

    return res
        .status(200)
        .json({
            data: data,
            message: 'User balance read successfully'
        });
};

export const readUserBalance = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    try {
        const { data, error } = await supabase
            .from('account')
            .select('balance')
            .eq('user_id', userId)
            .select();

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading user balance'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'User balance read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};