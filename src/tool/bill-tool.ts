import {BillDTO} from "../services/product/bill/bill-dto";
import {MeansOfPaymentDTO} from "../services/product/bill/means-of-payment-dto";

export class BillTool {

  public static totallyPaid(bill: BillDTO): boolean {
    let amountPaid = 0.0;
    for (let payment of bill.payments) {
      if (!payment.canceled)
        amountPaid += payment.amountPaid;
    }

    return amountPaid == bill.purchasePrice;
  }

  public static partiallyPaid(bill: BillDTO): boolean {
    let amountPaid = 0.0;
    for (let payment of bill.payments) {
      if (!payment.canceled)
        amountPaid += payment.amountPaid;
    }

    return amountPaid > 0.0;
  }

  public static remainingBalance(bill: BillDTO): number {
    let amountPaid = 0.0;
    for (let payment of bill.payments) {
      if (!payment.canceled) {
        if (MeansOfPaymentDTO.isGrouponPayment(payment.meansOfPayment)) {
          return 0.0
        } else {
          amountPaid += payment.amountPaid;
        }
      }
    }

    return bill.purchasePrice - amountPaid;
  }

}
