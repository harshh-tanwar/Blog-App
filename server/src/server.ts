import express, { Application, Request, Response, NextFunction } from "express";

//router
import router from "./routes/postRouter";

const app: Application = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Server Online");
});

app.use("/api", router);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
