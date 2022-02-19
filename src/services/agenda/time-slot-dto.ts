import {TechnicianDTO} from "../person/technician/technician-dto";
import {AppointmentDTO} from "../appointment/appointment-dto";

export class TimeSlotDTO {
  constructor(public idTimeSlot: number,
              public day: string,
              public begin: string,
              public time: number,
              public free: boolean,
              public isLaunchBreak: boolean,
              public isAbsence: boolean,
              public technician: TechnicianDTO,
              public appointment: AppointmentDTO) {
  }

  public static default(appointment?: AppointmentDTO): TimeSlotDTO {
    return new TimeSlotDTO(-1, "DEFAULT_TIME_SLOT", "DEFAULT_TIME_SLOT", -1, true,
      false, false, TechnicianDTO.default(),
      appointment === undefined ? AppointmentDTO.default() : appointment);
  }
}
