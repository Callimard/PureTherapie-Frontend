import {BillDTO} from "./bill-dto";

export class PaymentDTO {

  constructor(public idPayment: number,
              public amountPaid: number,
              public paymentDate: string,
              public bill: BillDTO) {
  }

  public static default(bill?: BillDTO): PaymentDTO {
    return new PaymentDTO(-1, -1, "DEFAULT_PAYMENT", bill ? bill : BillDTO.default());
  }
}
