import { Request, Response } from "express";
import { ChangePasswordUC } from "../../../business/usecase/user/changePassword";
import { UserDatabase } from "../../../data/userDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";

export const changePasswordEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new ChangePasswordUC(
      new UserDatabase(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const auth = req.headers.Authorization || req.headers.authorization
    if(!auth){
        throw new Error("Token not found")
    }

    const result = await uc.execute({
      token: auth as string,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      errMessage: err.message,
    });
  }
};
