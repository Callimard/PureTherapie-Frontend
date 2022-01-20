import {PersonDTO} from "../person-dto";

export class ClientDTO extends PersonDTO {
  constructor(idPerson: number, firstName: string, lastName: string, email: string, gender: boolean, phone: string, birthday: string, idPersonOrigin: number, public photo?: string,
              public comment?: string, public technicalComment?: string) {
    super(idPerson, firstName, lastName, email, gender, phone, birthday, idPersonOrigin);
  }
}
