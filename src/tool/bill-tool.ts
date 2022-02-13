import {BillDTO} from "../services/product/bill/bill-dto";
import {MeansOfPaymentDTO} from "../services/product/bill/means-of-payment-dto";

export class BillTool {

  public static totallyPaid(bill: BillDTO): boolean {
    return BillTool.amountPaid(bill) == bill.purchasePrice;
  }

  public static partiallyPaid(bill: BillDTO): boolean {
    return BillTool.amountPaid(bill) > 0.0;
  }

  public static remainingBalance(bill: BillDTO): number {
    return bill.purchasePrice - BillTool.amountPaid(bill);
  }

  public static amountPaid(bill: BillDTO): number {
    let amountPaid = 0.0;
    for (let payment of bill.payments) {
      if (!payment.canceled) {
        if (MeansOfPaymentDTO.isGrouponPayment(payment.meansOfPayment)) {
          return bill.purchasePrice;
        } else {
          amountPaid += payment.amountPaid;
        }
      }
    }

    return amountPaid;
  }

}
