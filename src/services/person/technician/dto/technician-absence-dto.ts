import {TechnicianDTO} from "./technician-dto";

export class TechnicianAbsenceDTO {

  constructor(public idTechnicianAbsence: number,
              public day: string,
              public beginTime: string,
              public endTime: string,
              public technician: TechnicianDTO) {
  }

  public static default() {
    return new TechnicianAbsenceDTO(-1, "DEFAULT_TECH_A", "DEFAULT_TECH_A",
      "DEFAULT_TECH_A", TechnicianDTO.default());
  }

}
