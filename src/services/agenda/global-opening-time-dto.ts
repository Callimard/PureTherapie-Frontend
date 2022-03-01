export class GlobalOpeningTimeDTO {

  constructor(public idGlobalOpeningTime: number,
              public dayNumber: number,
              public openingTime: string,
              public closeTime: string) {
  }

  public static default(): GlobalOpeningTimeDTO {
    return new GlobalOpeningTimeDTO(-1, 1, "00:00:00", "00:00:00");
  }

}
