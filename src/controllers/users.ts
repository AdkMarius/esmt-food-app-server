import logger from "../logger";
import {NextFunction, Request, Response} from "express";
import {supabase} from "../lib/supabase";

export const readUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id);

        if (error) {
            logger.error(error);
            return res.status(500).json({message: 'Error occur while reading user'});
        }

        return res
            .status(200)
            .json({
                data,
                message: 'User read successfully'
            });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ message: 'Invalid request data' });
    }
};

export const updateInfoUser = () => {

};

export const deleteUser = () => {

};