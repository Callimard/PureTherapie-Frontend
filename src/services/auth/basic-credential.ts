export class BasicCredential {

  public static readonly DEFAULT_USERNAME: string = "";
  public static readonly DEFAULT_PASSWORD: string = "";

  username: string;
  password: string;

  constructor(username: string = BasicCredential.DEFAULT_USERNAME, password: string = BasicCredential.DEFAULT_PASSWORD) {
    this.username = username;
    this.password = password;
  }

  public basicCredential(): string {
    return "Basic " + btoa(this.username + ":" + this.password);
  }
}
