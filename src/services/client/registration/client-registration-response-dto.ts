import {ClientDTO} from "./client-dto";

export class ClientRegistrationResponseDTO {

  constructor(public client_registration_success: string, public idClient: number, public client_registration_fail: any,
              public client_doubloon: ClientDTO[]) {
  }

}
