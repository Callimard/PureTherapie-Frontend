export class AestheticCareDTO {
  constructor(public idAestheticCare: number, public name: string, public price: number, public executionTime: number,
              public active: boolean) {
  }

  public static default(): AestheticCareDTO {
    return new AestheticCareDTO(-1, "DEFAULT AC", -1, -1, true);
  }
}
