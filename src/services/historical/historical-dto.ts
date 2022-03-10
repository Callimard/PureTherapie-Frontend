export class HistoricalDto {

  constructor(public idHistorical: number,
              public type: boolean,
              public historicalTitle: string,
              public text: string,
              public creationDate: string) {
  }

  public static default(): HistoricalDto {
    return new HistoricalDto(-1, false, "DEFAULT_HISTORICAL",
      "DEFAULT_HISTORICAL", "2022-01-01");
  }

}
