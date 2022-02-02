import {ClientDTO} from "../person/client/client-dto";
import {AppointmentDTO} from "../appointment/appointment-dto";

export class WaitingRoomDTO {
  constructor(public idWaitingRoom: number,
              public arrivalDate: string,
              public appointmentTime: string,
              public client: ClientDTO,
              public appointment: AppointmentDTO) {
  }

  public static default() {
    return new WaitingRoomDTO(-1, "DEFAULT_WR", "DEFAULT_WR",
      ClientDTO.default(), AppointmentDTO.default())
  }
}
