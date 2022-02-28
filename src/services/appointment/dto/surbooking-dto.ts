import {ClientArrivalDTO} from "./client-arrival-dto";
import {AestheticCareDTO} from "../../product/aesthetic/care/dto/aesthetic-care-dto";
import {ClientDTO} from "../../person/client/client-dto";

export class SurbookingDTO {

  constructor(public idSurbooking: number,
              public client: ClientDTO,
              public aestheticCare: AestheticCareDTO,
              public clientArrival: ClientArrivalDTO,
              public canceled: boolean,
              public day: string,
              public time: string,
              protected finalized: boolean) {
  }

  public static default() {
    return new SurbookingDTO(-1, ClientDTO.default(), AestheticCareDTO.default(), ClientArrivalDTO.default(),
      false, "DEFAULT_SURBOOKING", "DEFAULT_SURBOOKING", false);
  }

}
