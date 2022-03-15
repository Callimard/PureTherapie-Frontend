import {MeansOfPaymentTurnover} from "./means-of-payment-turnover";

export class TurnoverKPIPackage {

  constructor(public totalTurnover: number,
              public turnoverByMeanOfPayment: MeansOfPaymentTurnover[]) {
  }

}
