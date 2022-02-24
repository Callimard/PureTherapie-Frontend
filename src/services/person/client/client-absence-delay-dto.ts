export class ClientAbsenceDelayDTO {

  constructor(public nbAbsence: number,
              public nbDelay: number) {
  }

  public static default() {
    return new ClientAbsenceDelayDTO(-1, -1);
  }

}
