import {KpiDTO} from "../kpi/kpi-dto";

export class ReportTypeDTO {

  constructor(public idReportType: number,
              public name: string,
              public configurationKpis: KpiDTO[]) {
  }

  public static default() {
    return new ReportTypeDTO(-1, "DEFAULT", []);
  }

}
