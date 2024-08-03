import { Request, Response, NextFunction} from "express";
import { supabase } from "../lib/supabase";
import logger from "../logger";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert(req.body)
            .select();

        if (error) {
            logger.error(error);
            return res.status(500).json({ message: 'Error occurred when inserting' });
        }

        return res.status(201).json({
            data,
            message: 'Product created successfully'
        });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const readProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = JSON.parse(req.params.id);

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading product'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Product read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    const { data, error } = await supabase
        .from('products')
        .update(req.body)
        .eq('id', id)
        .select();

    if (error) {
        logger.error(error);
        return res.status(500).json({message: 'Error occur while modifying product'});
    }

    return res
        .status(200)
        .json({
            data: data,
            message: 'Product read successfully'
        });
};

export const readAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('isAvailable', true);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading products'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Products read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);

        const { error } =  await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while deleting product'});
        }

        return res
            .status(200)
            .json({
                message: 'Product deleted successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const readDayMenuProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('isDayMenu', true)
            .single();

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading day menu product'});
        }

        return res
            .status(200)
            .json({
                data: data,
                message: 'Day menu product read successfully'
            });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: 'Invalid request data' });
    }
};