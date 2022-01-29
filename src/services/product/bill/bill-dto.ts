import {ClientDTO} from "../../person/client/client-dto";
import {PaymentTypeDTO} from "./payment-type-dto";
import {PaymentDTO} from "./payment-dto";

export class BillDTO {

  constructor(public idBill: number,
              public basePrice: number,
              public purchasePrice: number,
              public creationDate: string,
              public client: ClientDTO,
              public paymentType: PaymentTypeDTO,
              public payments: PaymentDTO[]) {
  }

}
