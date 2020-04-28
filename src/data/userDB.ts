import { UserGateway } from "../business/gateways/userGateway";
import { User } from "../business/entities/user";
import { BaseDB } from "./baseDB";

export class UserDatabase extends BaseDB implements UserGateway {
  private usersTable = "users_futuretube";

  // alteração inputs da minha função

  public async signUp(user: User): Promise<void> {
    try {
      await this.connection.raw(`
      INSERT INTO ${
        this.usersTable
      } (id, name, email, birth_date, password, picture)
      VALUES(
        '${user.getId()}',
        '${user.getName()}',
        '${user.getEmail()}',
        '${user.getBirthDate()}',
        '${user.getPassword()}',
        '${user.getPicture()}'
      )
    `);
    } catch (err) {
      throw err;
    }
  }

  public async login(email: string): Promise<User | undefined> {
    const user = await this.connection.raw(`
      SELECT * FROM ${this.usersTable} WHERE email = '${email}'
    `);

    if (!user[0]) {
      return undefined;
    }

    return new User(
      user[0].id,
      user[0].name,
      user[0].email,
      user[0].birth_date,
      user[0].password,
      user[0].picture
    );
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
      SELECT * FROM ${this.usersTable} WHERE email = '${email}'
    `);

    if (!result[0][0]) {
      return undefined;
    }

    return new User(
      result[0][0].id,
      result[0][0].name,
      result[0][0].email,
      result[0][0].birthDate,
      result[0][0].password,
      result[0][0].picture
    );
  }

  public async getUserById(id: string): Promise<User> {
    const result = await this.connection.raw(`
      SELECT * FROM ${this.usersTable} WHERE id = '${id}'
    `);

    return new User(
      result[0][0].id,
      result[0][0].name,
      result[0][0].email,
      result[0][0].birth_date,
      result[0][0].password,
      result[0][0].picture
    );
  }

  public async updatePassword(id: string, newPassword: string): Promise<void> {
    await this.connection.raw(`
      UPDATE ${this.usersTable}
      SET password = '${newPassword}'
      WHERE id = '${id}'
    `);
  }
}
