import {HistoricalDto} from "./historical-dto";

export class HistoricalViewDto {

  constructor(public idHistoricalView: number,
              public viewed: boolean,
              public historical: HistoricalDto) {
  }

  public static default() {
    return new HistoricalViewDto(-1, false, HistoricalDto.default());
  }

}
