export class ClientRemainingStockPayDTO {

  constructor(public remainingStock: number,
              public remainingToPay: number) {
  }

  public static default() {
    return new ClientRemainingStockPayDTO(-1, -1);
  }

}
