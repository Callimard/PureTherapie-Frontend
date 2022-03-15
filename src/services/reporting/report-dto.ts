import {KpiDTO} from "../kpi/kpi-dto";
import {ReportTypeDTO} from "./report-type-dto";

export class ReportDTO {

  constructor(public idReport: number,
              public dateBegin: string,
              public dateEnd: string,
              public file: string,
              public reportType: ReportTypeDTO,
              public configurationKpis: KpiDTO[]) {
  }

  public static default() {
    return new ReportDTO(-1, "DEFAULT", "DEFAULT", "DEFAULT", ReportTypeDTO.default(), []);
  }
}
