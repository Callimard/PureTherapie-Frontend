import {SimpleClientInfoDTO} from "./client/simple-client-info-dto";

export class PersonDTO {
  constructor(public idPerson: number, public firstName: string, public lastName: string, public email: string, public gender: boolean,
              public phone: string, public birthday: string, public idPersonOrigin: number) {
  }

  public simpleIdentification(): string {
    return this.lastName + " " + this.firstName;
  }

  public static extractSimpleClientInfo(personDTO: PersonDTO) {
    return new SimpleClientInfoDTO(personDTO.idPerson);
  }
}
