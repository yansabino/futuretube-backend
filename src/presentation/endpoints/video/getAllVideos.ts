import { Request, Response } from "express";
import { VideoDB } from "../../../data/videoDB";
import { GetAllVideosUC } from "../../../business/usecase/video/getAllVideos";

export const getAllVideosEndPoint = async (req: Request, res: Response) => {
    try {
        const videoDB = new VideoDB()
        const uc = new GetAllVideosUC(videoDB)
        
        const input = {
            page: Number(req.query.page)
        }

        const result = await uc.execute(input)

        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
}