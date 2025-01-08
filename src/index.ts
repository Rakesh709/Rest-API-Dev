import express from "express";
import http from "http";
import bodyParser from "body-parser"
import cookieParser from "Cookie-parser"
import compression from "compression"
import cors from "cors"

const app = express();

app.use(cors({
    credentials:true
}));

app.use(compression());
app.use(cookieParser())
app.use(bodyParser.json())

const server=  http.createServer(app)
