export class ExceptionalOpeningDTO {

  constructor(public idExceptionalOpening: number,
              public day: string,
              public openingTime: string,
              public closeTime: string) {
  }

  public static default(): ExceptionalOpeningDTO {
    return new ExceptionalOpeningDTO(-1, "1996-01-01", "00:00:00", "00:00:00");
  }

}
