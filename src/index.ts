import express from "express";
import http from "http";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose";
import router from "./router";



const app = express();

app.use(express.json())

app.use(cors({
    credentials:true,
}));
//for the authentication

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server =  http.createServer(app);


server.listen(8080,()=>{
    console.log("Server is runnning on https://localhost:8080")
});

const MONGO_URL ="mongodb+srv://galaxygalactus4:Z4zf@rest-api-cluster.iag5t.mongodb.net/?retryWrites=true&w=majority&appName=rest-api-cluster"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));
mongoose.connection.on("error",(error:Error)=> console.log(error))

app.use('/',router());
