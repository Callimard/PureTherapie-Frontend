import {KPIRes} from "../kpires";
import {TurnoverKPIPackage} from "./turnover-kpipackage";

export class TurnoverKPIRes extends KPIRes {

  constructor(public override kpiName: string,
              public override res: TurnoverKPIPackage) {
    super(kpiName, res);
  }

}
