import {TechnicianDTO} from "../../person/technician/dto/technician-dto";
import {AestheticCareDTO} from "../../product/aesthetic/care/dto/aesthetic-care-dto";

export class AppointmentData {
  constructor(public clientId: number, public technician: TechnicianDTO,
              public ac: AestheticCareDTO,
              public day: string,
              public beginTime: string,
              public overlapAuthorized: boolean = false) {
  }

  public static default() {
    return new AppointmentData(-1, TechnicianDTO.default(), AestheticCareDTO.default(), "DEFAULT_APP_DATA", "DEFAULT_APP_DATA");
  }
}
