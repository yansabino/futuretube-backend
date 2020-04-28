import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class GetUserByIdUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway
  ) {}
  public async execute(
    input: GetUserByIdUCInput
  ): Promise<GetUserByIdUCOutput> {
    if (!input.token) {
      throw new Error("Missing authorization token");
    }

    const usersInfo = this.authenticationGateway.getUsersInfoFromToken(
      input.token
    );

    const id = usersInfo.id;

    const user = await this.userGateway.getUserById(id);
    return {
      name: user.getName(),
      email: user.getEmail(),
      picture: user.getPicture(),
    };
  }
}

export interface GetUserByIdUCInput {
  token: string;
}

export interface GetUserByIdUCOutput {
  name: string;
  email: string;
  picture: string;
}
