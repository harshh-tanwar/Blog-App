import express, { Application, Request, Response } from "express";
import config from "./config/config";
import cors from "cors";

//db
import dbConnect from "./database/dbConnect";
//router
import postRouter from "./routes/postRouter";
import uploadRouter from "./routes/pdfRouter";
import userRouter from "./routes/userRouter";

const app: Application = express();
const port = process.env.PORT || config.port;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", postRouter);
app.use("/api", uploadRouter);
app.use("/api", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("🟢 Server Online");
});
app.listen(port, () => console.log(`🟢 Running on http://localhost:${port}`));

dbConnect();
