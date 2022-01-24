import {AestheticCareDTO} from "./aesthetic-care-dto";

export class AestheticCarePackageDTO {
  constructor(public idAestheticCarePackage: number,
              public aestheticCare: AestheticCareDTO,
              public name: string,
              public numberAestheticCare: number) {
  }

  public static default(): AestheticCarePackageDTO {
    return new AestheticCarePackageDTO(-1, AestheticCareDTO.default(), "DEFAULT_AC_PACKAGE", 5);
  }
}
