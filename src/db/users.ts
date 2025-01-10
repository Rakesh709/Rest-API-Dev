//user schema and model

import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authantication: {
        password: {
            type: String,
            required: true,
            select: false
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        },
    }
})

//schma into model 

export const UserModel =  mongoose.model("User",UserSchema)

export const getUser =( )=>UserModel.find();
export const getUserByEmail = (email:String)=> UserModel.findOne({email})
export const getUserBySessionToken =(sessionToken:String)=> UserModel.findOne({
    'authantication.sessionToken' : sessionToken,
})

export const getUserById =(id:String) => UserModel.findById(id)

export const createUser = (values : Record<string,any>) => new UserModel(values).save().then((user) => user.toObject())

export const deleteUserById= (id:String) => UserModel.findOneAndDelete({_id:id});

export const updateUserById = (id:string,values:Record<string,any>)=> UserModel.findByIdAndUpdate(id,values)





// "find" and "findOne" are both methods available in Mongoose, a MongoDB Object Data Modeling (ODM) library, used to retrieve data from a database collection; 

// "find" returns an array of all matching documents while 

// "findOne" only returns the first matching document based on a given query criteria