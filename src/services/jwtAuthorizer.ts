import {
  AuthenticationGateway,
  UsersInfoForToken
} from "../business/gateways/authenticationGateway";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class JwtAuthorizer implements AuthenticationGateway {
  private SECRET_KEY = process.env.SECRET_KEY as string;;
  private expiresIn = "10h";

  public generateToken(input: UsersInfoForToken): string {
    const token = jwt.sign(
      {
        id: input.id,
      },
      this.SECRET_KEY,
      {
        expiresIn: this.expiresIn
      }
    );

    return token;
  }

  public getUsersInfoFromToken(token: string): UsersInfoForToken {
    const result = jwt.verify(token, this.SECRET_KEY) as UsersInfoForToken; // id, type
    return {
      id: result.id
    };
  }
}
