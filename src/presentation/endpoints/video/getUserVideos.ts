import { Request, Response } from "express";
import { VideoDB } from "../../../data/videoDB";
import { GetUserVideosUC } from "../../../business/usecase/video/getUserVideos";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const getUserVideosEndPoint = async (req: Request, res: Response) => {
  try {
    const videoDB = new VideoDB();
    const jwtAuth = new JwtAuthorizer();
    const getUserVideoUC = new GetUserVideosUC(videoDB, jwtAuth);

    const auth = req.headers.Authorization || req.headers.authorization
    if(!auth){
        throw new Error("Token not found")
    }

    const result = await getUserVideoUC.execute({
      userId: req.query.userId as string || "",
      token: auth as string,
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
