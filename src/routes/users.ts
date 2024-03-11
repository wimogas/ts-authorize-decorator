import express, {Request, Response, NextFunction} from "express";
import {CreateUserController} from "../controllers/CreateUserController";

const router = express.Router()

router.post('/',
    (req: Request, res: Response, next: NextFunction) => {

        const controller = new CreateUserController()

        try {
            const result = controller.execute(req)

            res.json({result})

        } catch (error) {
            next(error)
        }
});

export default router