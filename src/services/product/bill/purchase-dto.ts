export class PurchaseDTO {

  constructor(public type: string,
              public date: string,
              public price: number,
              public totallyPaid: boolean) {
  }

  public static default() {
    return new PurchaseDTO("DEFAULT_PURCHASE", "DEFAULT_PURCHASE", -1.0, false);
  }

}
