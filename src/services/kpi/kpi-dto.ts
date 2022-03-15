export class KpiDTO {

  constructor(public idKPI: number,
              public name: string,
              public description: string,
              public formula: string,
              public tags: string) {
  }

}
