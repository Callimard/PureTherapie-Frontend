import {BillDTO} from "./bill-dto";
import {MeansOfPaymentDTO} from "./means-of-payment-dto";

export class PaymentDTO {

  constructor(public idPayment: number,
              public amountPaid: number,
              public canceled: boolean,
              public paymentDate: string,
              public meansOfPayment: MeansOfPaymentDTO,
              public bill: BillDTO) {
  }

  public static default(bill?: BillDTO): PaymentDTO {
    return new PaymentDTO(-1, -1, false, "DEFAULT_PAYMENT", MeansOfPaymentDTO.default(), bill ? bill : BillDTO.default());
  }
}
