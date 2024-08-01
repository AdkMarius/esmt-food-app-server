import {NextFunction, Request, Response} from "express";
import logger from "../logger";
import {supabase} from "../lib/supabase";

export const readAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading categories'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Categories read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
}