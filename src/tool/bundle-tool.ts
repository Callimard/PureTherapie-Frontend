import {BundleDTO} from "../services/product/aesthetic/bundle/dto/bundle-dto";

export class BundleTool {

  public static hasOnlyACPackage(bundle: BundleDTO): boolean {
    return bundle.aestheticCarePackageList.length == 1;
  }

}
