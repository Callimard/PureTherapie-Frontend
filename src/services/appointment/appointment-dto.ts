import {TimeSlotDTO} from "../agenda/time-slot-dto";
import {AestheticCareDTO} from "../product/aesthetic/care/dto/aesthetic-care-dto";
import {ClientDTO} from "../person/client/client-dto";
import {TechnicianDTO} from "../person/technician/technician-dto";
import {ClientArrivalDTO} from "./client-arrival-dto";

export class AppointmentDTO {

  constructor(public idAppointment: number,
              public aestheticCare: AestheticCareDTO,
              public client: ClientDTO,
              public technician: TechnicianDTO,
              public clientArrival: ClientArrivalDTO,
              public canceled: boolean,
              public day: string,
              public time: string,
              public finalized: boolean,
              public timeSlots: TimeSlotDTO[]) {
  }

  public static default(): AppointmentDTO {
    let a = new AppointmentDTO(-1, AestheticCareDTO.default(), ClientDTO.default(), TechnicianDTO.default(),
      ClientArrivalDTO.default(), false, "DEFAULT_APPOINTMENT", "DEFAULT_APPOINTMENT", false, []);
    return new AppointmentDTO(-1, AestheticCareDTO.default(), ClientDTO.default(), TechnicianDTO.default(),
      ClientArrivalDTO.default(), false, "DEFAULT_APPOINTMENT", "DEFAULT_APPOINTMENT", false, [TimeSlotDTO.default(a)]);
  }

}
