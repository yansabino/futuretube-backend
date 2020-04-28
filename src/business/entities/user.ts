import { threadId } from "worker_threads";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private birthDate: string,
    private password: string = "",
    private picture: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getBirthDate(): string {
    return this.birthDate;
  }

  public getPassword(): string {
    return this.password;
  }

  public getPicture(): string {
    return this.picture
  }
}
