import {BillDTO} from "./bill-dto";

export class PaymentDTO {

  constructor(public idPayment: number,
              public amountPaid: number,
              public paymentDate: string,
              public bill: BillDTO) {
  }
}
