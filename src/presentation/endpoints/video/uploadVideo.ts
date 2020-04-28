import { Request, Response } from "express";
import { UploadVideoUC } from "../../../business/usecase/video/uploadVideo";
import { VideoDB } from "../../../data/videoDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const uploadVideoEndPoint = async (req: Request, res: Response) => {
  try {
    const uc = new UploadVideoUC(new VideoDB());
    const jwtAuth = new JwtAuthorizer();

    const auth = req.headers.Authorization || req.headers.authorization
    if(!auth){
        throw new Error("Token not found")
    }
    
    const userId = jwtAuth.getUsersInfoFromToken(auth as string);
    const input = {
      url: req.body.url,
      description: req.body.description,
      title: req.body.title,
      userId: userId.id,
    };

    await uc.execute(input);
    res.status(200).send({ message: "Video Uploaded" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
