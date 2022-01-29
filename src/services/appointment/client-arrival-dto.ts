import {ClientDTO} from "../person/client/client-dto";

export class ClientArrivalDTO {
  constructor(public idClientArrival: number,
              public arrivalDate: string,
              public client: ClientDTO) {
  }

  public static default(): ClientArrivalDTO {
    return new ClientArrivalDTO(-1, "CLIENT_ARRIVAL_DEFAULT", ClientDTO.default());
  }
}
