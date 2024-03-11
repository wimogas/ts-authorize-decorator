import {Response, Request, NextFunction} from "express";

const handleErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
        console.log(error)
        error.status = error.status || 404;
        error.title = error.title || error;
        return res.setHeader('content-type', 'application/problem+json')
            .status(error.status)
            .json({...error})
}

export default handleErrorMiddleware;