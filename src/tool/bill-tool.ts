import {BillDTO} from "../services/product/bill/bill-dto";

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

}
