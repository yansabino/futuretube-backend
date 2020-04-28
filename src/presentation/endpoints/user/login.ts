import { Request, Response } from "express";
import { UserDatabase } from "../../../data/userDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { LoginUserUC } from "../../../business/usecase/user/login";
import { BcryptService } from "../../../services/bcryptService";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new LoginUserUC(
      new UserDatabase(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await uc.execute({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      errMessage: err.message,
    });
  }
};
