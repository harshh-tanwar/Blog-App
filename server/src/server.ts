import express, {
  Application,
  Request,
  Response,
  NextFunction,
  urlencoded,
} from "express";
import config from "./config/config";
//db
import dbConnect from "./database/dbConnect";
//router
import router from "./routes/postRouter";

const app: Application = express();
const port = process.env.PORT || config.port;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("🟢 Server Online");
});

app.listen(port, () => console.log(`🟢 Running on http://localhost:${port}`));

dbConnect();
