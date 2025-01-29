import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import { connectToDB } from "./database/connection.js";

env.config();

const app = express();
const port = process.env.PORT || 4000;

connectToDB();

// Middleware
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve API routes
app.use("/auth", authRouter);
app.use("/product", productRouter);

app.get('/',(req,res)=>{
  res.send('Hello Developer!')
})

// Server setup
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});