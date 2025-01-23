import express from "express";
import{config} from "dotenv"
import { dbconnection } from "./DB/dbconnection.js";
import userRouter from "./router/userrouter.js"
import cookieParser from "cookie-parser";
import taskRouter from "./router/taskrouter.js"
import cors from "cors"
const app = express();


config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","DELETE","POST"],
    credentials:true,
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);



dbconnection();
export default app;