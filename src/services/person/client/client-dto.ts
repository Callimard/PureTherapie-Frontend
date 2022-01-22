import {PersonDTO} from "../person-dto";

export class ClientDTO extends PersonDTO {
  constructor(idPerson: number, firstName: string, lastName: string, email: string, gender: boolean, phone: string, birthday: string, idPersonOrigin: number, public photo?: string,
              public comment?: string, public technicalComment?: string) {
    super(idPerson, firstName, lastName, email, gender, phone, birthday, idPersonOrigin);
  }

  public static default(): ClientDTO {
    return new ClientDTO(-1, "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO",
      "DEFAULT_CLIENT_DTO", false, "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO", -1,
      "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO");
  }
}
