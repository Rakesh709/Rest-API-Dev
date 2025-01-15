import express from "express"
import {get,merge} from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async (req:express.Request, res: express.Response , next: express.NextFunction) :Promise<any> =>{
    try {
        const {id} = req.params;
        const currentUserId = get(req,'identity._id') as string;
        console.log("Current User ID:", currentUserId);
        console.log("Requested User ID:", id);

        if(!currentUserId){
            return res.sendStatus(403)
        }

        if(currentUserId.toString() !== id){
            return res.sendStatus(403)
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async (req:express.Request, res:express.Response, next:express.NextFunction) : Promise<any>  =>{
    try {
        
        //get the cookies
        const sessionToken = req.cookies['RAKESH-AUTH']
        //console.log("Session Token:", sessionToken);

        if(!sessionToken){
            //console.log("No session token found in cookies.");
            return res.sendStatus(403)
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        console.log("Existing User:", existingUser);
        if(!existingUser){
            //console.log("No user found for the provided session token.");
            return res.sendStatus(403)
        }

        // req.identity = existingUser
        merge(req, {identity: existingUser });
        return next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
} 
