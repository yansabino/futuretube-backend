import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { v4 } from "uuid";
import { User } from "../../entities/user";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class SignUpUC {
  constructor(
    private db: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  public async execute(input: SignUpUCInput): Promise<SignUpUCOutput> {
    // gerar um id,
    const id = this.generateUserId();

    //verificar inputs

    if (!input.name || input.name.length < 1) {
      throw new Error("Input name is missing!");
    }
    if (!input.email || input.email.length < 1) {
      throw new Error("Input email is missing!");
    }
    if (!input.birthDate || input.birthDate.length < 1) {
      throw new Error("Input birthDate is missing!");
    }
    if (!input.picture || input.picture.length < 1) {
      throw new Error("Input picture is missing!");
    }


    // criptopgrar a senha
    const pass = await this.cryptographyGateway.encrypt(input.password);
    const invalidPassword = pass.length < 6;

    if (!pass || invalidPassword) {
      throw new Error("Password does not exist or is not valid");
    }
    // salvar o usuário no banco
    const user = new User(id, input.name, input.email, input.birthDate, pass, input.picture);
    await this.db.signUp(user);

    //gerar token
    const token = this.authenticationGateway.generateToken({
      id: user.getId(),
    });

    return {
      token,
    };
  }

  private generateUserId() {
    return v4();
  }
}

interface SignUpUCInput {
  name: string;
  email: string;
  birthDate: string;
  password: string;
  picture: string
}

interface SignUpUCOutput {
  token: string;
}
