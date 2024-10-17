import express from "express";
import apiRouter from "./routes/apiRouter";
import errorHandler from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
