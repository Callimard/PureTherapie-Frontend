import {ClientDTO} from "../../../../person/client/client-dto";
import {BundleDTO} from "./bundle-dto";
import {BillDTO} from "../../../bill/bill-dto";

export class BundlePurchaseDTO {

  constructor(public idBundlePurchase: number,
              public client: ClientDTO,
              public bundle: BundleDTO,
              public bill: BillDTO) {
  }

  public static default(): BundlePurchaseDTO {
    return new BundlePurchaseDTO(-1, ClientDTO.default(), BundleDTO.default(), BillDTO.default());
  }

}
