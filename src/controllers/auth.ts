import { Request, Response} from "express";
import {supabase} from "../lib/supabase";
import logger from "../logger";

export const signIn = async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .auth
        .signInWithPassword({
            email: req.body.email,
            password: req.body.password
        });

    if (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Error occurs while sign-in the user' });
    }

    return res
        .status(200)
        .json({
            data,
            message: 'Successfully sign-In'
        })
};

export const signUp = async (req: Request, res: Response) => {
    const {
        email,
        password,
        group
    } = req.body;

    console.log(email, password, group);

    if ( (!email || !password) || (!email.length || !password.length)) {
        return res.status(400).json({ message: 'Bad request. All fields are required.' });
    }

    const newUser = (group && group.length) ? {
        email: email,
        password: password,
        options: {
            data: {
                group: group
            }
        }
    } : {
        email: email,
        password: password,
    };

    const { data, error } = await supabase
        .auth
        .signUp(newUser);

    if (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Error occurs while sign-up the user' });
    }

    return res
        .status(200)
        .json({
            data,
            message: 'Successfully sign-In'
        })
};