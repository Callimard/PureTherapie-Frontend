import {ClientDTO} from "./client-dto";

export class ClientRegistrationFailDTO {
  constructor(public firstName: string, public lastName: string, public email: string, public phone: string,
              public photo: string, public comment: string, public technicalComment: string,
              public constraintViolation: string, public dataIntegrity: string, public doubloons: ClientDTO[]) {
  }
}
