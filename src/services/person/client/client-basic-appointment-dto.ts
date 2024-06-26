import {AppointmentDTO} from "../../appointment/dto/appointment-dto";

export class ClientBasicAppointmentDTO {

  constructor(public firstAppointment: AppointmentDTO,
              public lastAppointment: AppointmentDTO) {
  }

  public static default() {
    return new ClientBasicAppointmentDTO(AppointmentDTO.default(), AppointmentDTO.default());
  }

}
