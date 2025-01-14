import express from "express"

import { deleteUserById, getUser, getUserById } from "../db/users";
import { identity } from "lodash";
export const getAllUsers = async (req:express.Request, res: express.Response) : Promise<any>=>{
    try {
        
        
        const users = await getUser();


        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deletUser = async (req:express.Request, res:express.Response) :Promise<any> =>{
    try {
        const {id} = req.params;
        const deletUser = await deleteUserById(id);
        return res.json(deletUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req:express.Request, res:express.Response) :Promise<any> => {
    try {
        const {id} = req.params;
        const {username} = req.body;

        if(!username){
           return res.sendStatus(400) 
        }

        const user = await getUserById(id);
        await user.save();

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(400)
        res.sendStatus(400)
    }
}