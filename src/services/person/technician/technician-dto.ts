import {PersonDTO} from "../person-dto";

export class TechnicianDTO extends PersonDTO {
  constructor(idPerson: number, firstName: string, lastName: string, email: string, gender: boolean, phone: string, birthday: string,
              idPersonOrigin: number, public speciality?: string, public isActive?: boolean) {
    super(idPerson, firstName, lastName, email, gender, phone, birthday, idPersonOrigin);
  }
}
