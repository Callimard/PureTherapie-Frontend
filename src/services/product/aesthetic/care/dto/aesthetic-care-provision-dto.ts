import {ClientDTO} from "../../../../person/client/client-dto";
import {AestheticCareDTO} from "./aesthetic-care-dto";
import {TechnicianDTO} from "../../../../person/technician/dto/technician-dto";
import {AppointmentDTO} from "../../../../appointment/dto/appointment-dto";

export class AestheticCareProvisionDTO {

  constructor(public idAestheticCareProvision: number,
              public date: string,
              public client: ClientDTO,
              public appointment: AppointmentDTO,
              public technician: TechnicianDTO,
              public aestheticCare: AestheticCareDTO) {
  }

}
