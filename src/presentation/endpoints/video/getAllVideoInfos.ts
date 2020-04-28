import { Request, Response } from "express";
import { VideoDB } from "../../../data/videoDB";
import { GetAllVideoInfosUC } from "../../../business/usecase/video/getAllVideoInfos";


export const getAllVideoInfos = async (req: Request, res: Response) => {
    try {
       const videoDB = new VideoDB()
       
       const uc = new GetAllVideoInfosUC(videoDB)
       const result = await uc.execute({
           videoId: req.query.videoId as string
       })
       res.status(200).send(result)
    } catch (err) {
        res.status(err.errCode || 404).send({
            message: err.message,
        }); 
    }
}