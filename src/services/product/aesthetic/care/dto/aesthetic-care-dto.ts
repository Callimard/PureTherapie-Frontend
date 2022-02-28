export class AestheticCareDTO {
  constructor(public idAestheticCare: number, public name: string, public price: number, public timeExecution: number) {
  }

  public static default(): AestheticCareDTO {
    return new AestheticCareDTO(-1, "DEFAULT AC", -1, -1);
  }
}
