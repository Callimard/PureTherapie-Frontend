import {AestheticCareDTO} from "../care/dto/aesthetic-care-dto";
import {BundlePurchaseDTO} from "./bundle-purchase-dto";

export class StockDTO {

  constructor(public idStock: number,
              public remainingQuantity: number,
              public aestheticCare: AestheticCareDTO,
              public bundlePurchase: BundlePurchaseDTO) {
  }

  public static default(): StockDTO {
    return new StockDTO(-1, -1, AestheticCareDTO.default(), BundlePurchaseDTO.default());
  }

}
