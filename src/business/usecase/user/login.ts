import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class LoginUserUC {
  constructor(
    private db: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  public async execute(input: LoginUserUCInput): Promise<LoginUserUCOutput> {
    // email, e a senha
    // pegar as infos do usuário a partir do email dele => FUNCAO NO BANCO
    const user = await this.db.getUserByEmail(input.email);

    if (!user) {
      throw new Error("User not found");
    }

    // compara a senha salva com a senha enviada

    const passwordCompare = await this.cryptographyGateway.compare(
      input.password,
      user.getPassword()
    );

    if (!passwordCompare) {
      throw new Error("Wrong Password or Email");
    }

    // Se estiver compatível, geramos o token e o usuário está logado
    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
    });

    return {
      token,
    };
  }
}

interface LoginUserUCInput {
  email: string;
  password: string;
}

interface LoginUserUCOutput {
  token: string;
}
