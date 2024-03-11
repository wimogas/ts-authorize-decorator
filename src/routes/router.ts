import express from "express";
import userRouter from "./users";

const router = express.Router()

router.use('/demo', userRouter);

export default router;