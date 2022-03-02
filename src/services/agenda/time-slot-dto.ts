import {TechnicianDTO} from "../person/technician/dto/technician-dto";
import {AppointmentDTO} from "../appointment/dto/appointment-dto";

export class TimeSlotDTO {
  constructor(public idTimeSlot: number,
              public day: string,
              public begin: string,
              public duration: number,
              public free: boolean,
              public launchBreak: boolean,
              public absence: boolean,
              public technician: TechnicianDTO,
              public appointment: AppointmentDTO) {
  }

  public static default(appointment?: AppointmentDTO): TimeSlotDTO {
    return new TimeSlotDTO(-1, "DEFAULT_TIME_SLOT", "DEFAULT_TIME_SLOT", -1, true,
      false, false, TechnicianDTO.default(),
      appointment === undefined ? AppointmentDTO.default() : appointment);
  }
}
