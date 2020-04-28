import { Request, Response } from "express";
import { SignUpUC } from "../../../business/usecase/user/signUp";
import { UserDatabase } from "../../../data/userDB";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";

export const signUpEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new SignUpUC(
      new UserDatabase(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await uc.execute({
      name: req.body.name,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: req.body.password,
      picture: req.body.picture
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      errMessage: err.message,
    });
  }
};
