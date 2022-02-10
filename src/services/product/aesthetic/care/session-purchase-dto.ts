import {AestheticCareDTO} from "./aesthetic-care-dto";
import {ClientDTO} from "../../../person/client/client-dto";
import {BillDTO} from "../../bill/bill-dto";

export class SessionPurchaseDTO {

  constructor(public idSessionPurchase: number,
              public used: boolean,
              public aestheticCare: AestheticCareDTO,
              public client: ClientDTO,
              public bill: BillDTO) {
  }

  public static default(): SessionPurchaseDTO {
    return new SessionPurchaseDTO(-1, false, AestheticCareDTO.default(), ClientDTO.default(), BillDTO.default());
  }

}
