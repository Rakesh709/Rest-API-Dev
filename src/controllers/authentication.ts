import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response):Promise<any> => {
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.sendStatus(400)
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        //select('+authentication.salt +authentication.password')
        // above is very imp
        if(!user){
            return res.sendStatus(400)
        }

        //validating user without password
        const expecetedHash = authentication(user.authentication.salt, password)

        if(user.authentication.password  !== expecetedHash){
            return res.sendStatus(403)
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt,user._id.toString());

        await user.save();

        res.cookie("RAKESH-AUTH",user.authentication.sessionToken,{domain:'localhost',path:'/',expires: new Date(Date.now() + 3600000)});

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        //console.log("Request Body:", req.body);
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400)
        }


        const salt = random();

        //create user 

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}