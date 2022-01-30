export class PaymentTypeDTO {

  constructor(public idPaymentType: number,
              public name: string,
              public description: string) {
  }

  public static default(): PaymentTypeDTO {
    return new PaymentTypeDTO(-1, "DEFAULT_PAYMENT_TYPE", "DEFAULT_PAYMENT_TYPE");
  }

}
