import express from "express"

import { deletUser, getAllUsers, updateUser } from "../controllers/users"
import { isAuthenticated,isOwner } from "../middlewares";

export default (router:express.Router) =>{
    router.get('/users',getAllUsers);
    //router.get('/users',isAuthenticated,getAllUsers);
    //need to check isAuthanticated is not working
    router.delete('/users/:id',isAuthenticated,isOwner,deletUser)
    router.patch('/users/:id', isAuthenticated,isOwner,updateUser);
} ;