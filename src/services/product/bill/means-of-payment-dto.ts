import {GlobalVariables} from "../../../global/global-variables";

export class MeansOfPaymentDTO {

  constructor(public idMeansOfPayment: number,
              public name: string,
              public description: string) {
  }

  public static default() {
    return new MeansOfPaymentDTO(-1, "DEFAULT_MEANS_OF_PAYMENT", "DEFAULT_MEANS_OF_PAYMENT");
  }

  public static isGrouponPayment(meansOfPayment: MeansOfPaymentDTO): boolean {
    return meansOfPayment.name === GlobalVariables.GROUPON_PAYMENT;
  }

}
