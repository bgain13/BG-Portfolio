import { Router, type IRouter } from "express";
import assetsRouter from "./assets";
import authRouter from "./auth";
import healthRouter from "./health";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(assetsRouter);
router.use(storageRouter);

export default router;
