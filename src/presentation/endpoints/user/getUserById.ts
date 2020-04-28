import { Request, Response } from "express";
import { UserDatabase } from "../../../data/userDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { GetUserByIdUC } from "../../../business/usecase/user/getUserById";

export const getUserByIdEndPoint = async (req: Request, res: Response) => {
  try {
    const uc = new GetUserByIdUC(new UserDatabase(), new JwtAuthorizer());

    const auth = req.headers.Authorization || req.headers.authorization
    if(!auth){
        throw new Error("Token not found")
    }

    const result = await uc.execute({
      token: auth as string,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      errMessage: err.message,
    });
  }
};
