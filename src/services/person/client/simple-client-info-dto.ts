export class SimpleClientInfoDTO {
  constructor(public idPerson: number) {
  }

  public static default(): SimpleClientInfoDTO {
    return new SimpleClientInfoDTO(-1);
  }
}
