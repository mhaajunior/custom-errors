import { Router, Request, Response } from "express";
import userRoutes from "./user.route";

const apiRouter = Router();

// รวบรวม route group ทั้งหมด
apiRouter.use("/users", userRoutes); // /api/users

apiRouter.get("/health", (req: Request, res: Response) => {
  res.send(`Server Up! on ${process.env.INSTANCE_NAME}`);
});

apiRouter.get("/secret", (req: Request, res: Response) => {
  res.send(`Secret Message: ${process.env.SECRET}`);
});

export default apiRouter;
