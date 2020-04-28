import { Request, Response } from "express";
import { VideoDB } from "../../../data/videoDB";
import { ChangeVideosInfosUC } from "../../../business/usecase/video/changeVideosInfos";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const changeVideoInfosEndPoint = async (req: Request, res: Response) => {
    try {
        const videoDB = new VideoDB()
        const uc = new ChangeVideosInfosUC(videoDB, new JwtAuthorizer())

        const auth = req.headers.Authorization || req.headers.authorization
        if(!auth){
            throw new Error("Token not found")
        }
    
        const result = await uc.execute({
            token: auth as string,
            videoId: req.body.videoId,
            newDescription: req.body.newDescription,
            newTitle: req.body.newTitle
        })

        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            errMessage: err.message,
        });
    }

}