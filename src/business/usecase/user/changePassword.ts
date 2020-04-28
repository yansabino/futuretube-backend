import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserGateway } from "../../gateways/userGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class ChangePasswordUC {
  constructor(
    private db: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  public async execute(
    input: ChangePasswordUCInput
  ): Promise<ChangePasswordUCOutput> {
    if (!input.token) {
      throw new Error("Missing authorization token");
    }

    // [CHECK] INPUT: token, email, senha antiga, senha nova
    // [CHECK] token -> id do usuário
    const usersInfo = this.authenticationGateway.getUsersInfoFromToken(
      input.token
    );
    const id = usersInfo.id;

    // id do usuário -> banco pegar o usuário com esse id
    const user = await this.db.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // usuário -> 1. compara a senha antiga do usuário com a senha salva no banco
    const isPasswordCorrect = await this.cryptographyGateway.compare(
      input.oldPassword,
      user.getPassword()
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorret information");
    }

    // banco -> autualiza a senha com a nova senha
    const pass = await this.cryptographyGateway.encrypt(input.newPassword);
    await this.db.updatePassword(user.getId(), pass);

    // [CHECK] devolver um novo token
    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
    });

    return {
      token,
    };
  }
}

interface ChangePasswordUCInput {
  token: string;
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordUCOutput {
  token: string;
}
