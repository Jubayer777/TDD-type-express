import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import indexedRoute from "./routes/routes";
import connectDB from "./config/connectDb";
dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT);
const dbURL: string = String(process.env.DATABASE_URL);

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/api", indexedRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("hello mr");
});

connectDB(dbURL);
app.listen(port, () => {
  console.log("running");
});

export default app;
