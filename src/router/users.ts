import express from "express"

import { deleteUser, getAllUsers, updateUser } from "../controllers/users"
import { isAuthenticated,isOwner } from "../middlewares";

export default (router:express.Router) =>{
    router.get('/users',isAuthenticated,getAllUsers);
    //router.get('/users',isAuthenticated,getAllUsers);
    //need to check isAuthanticated is not working
    router.delete('/users/:id',isAuthenticated,isOwner,deleteUser)
    router.patch('/users/:id', isAuthenticated,isOwner,updateUser);
} ;