import {AestheticCarePackageDTO} from "../care/dto/aesthetic-care-package-dto";

export class BundleDTO {
  constructor(public idBundle: number,
              public name: string,
              public price: number,
              public aestheticCarePackageList: AestheticCarePackageDTO[]) {
  }

  public static default(): BundleDTO {
    return new BundleDTO(-1, "DEFAULT_BUNDLE", -15.5,
      [AestheticCarePackageDTO.default(), AestheticCarePackageDTO.default()]);
  }
}
