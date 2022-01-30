import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BundleDTO} from "./bundle-dto";
import {GlobalVariables} from "../../../../global/global-variables";
import {SimpleResponseDTO} from "../../../util/simple-response-dto";
import {BundlePurchaseDTO} from "./bundle-purchase-dto";
import {StockDTO} from "./stock-dto";

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllBundles(): Promise<BundleDTO[]> {
    return new Promise<BundleDTO[]>(((resolve, reject) => {
      this.httpClient.get<BundleDTO[]>(GlobalVariables.BUNDLES_URL).subscribe({
        next: (bundles) => {
          resolve(bundles);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all Bundles, error = ", err.error);
          reject(err);
        }
      });
    }));
  }

  purchaseBundle(idBundle: number, idClient: number, customPrice?: number, idPaymentType?: number): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.post<SimpleResponseDTO>(GlobalVariables.BUNDLES_URL + "/" + idBundle
        + GlobalVariables.BUNDLE_PURCHASE + "?idClient=" + idClient
        + (customPrice ? ("&customPrice=" + customPrice) : '')
        + (idPaymentType ? ("&idPaymentType=" + idPaymentType) : ''), {})
        .subscribe({
          next: (resp) => {
            resolve(resp);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to purchase Bundle. Error = ", err.error);
            reject(err);
          }
        })
    }))
  }

  getAllClientBundlePurchases(idClient: number): Promise<BundlePurchaseDTO[]> {
    return new Promise<BundlePurchaseDTO[]>(((resolve, reject) => {
      this.httpClient.get<BundlePurchaseDTO[]>(GlobalVariables.CLIENT_ALL_BUNDLE_PURCHASES_URL + "?idClient=" + idClient).subscribe({
        next: (res) => {
          console.log("Bundle Purchase receive = ", res);
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all client bundle purchases");
          reject(err.error);
        }
      })
    }));
  }

  getAllStocks(idBundlePurchase: number): Promise<StockDTO[]> {
    return new Promise<StockDTO[]>(((resolve, reject) => {
      this.httpClient.get<StockDTO[]>(GlobalVariables.CLIENT_ALL_BUNDLE_PURCHASES_URL + "/" + idBundlePurchase
        + GlobalVariables.ALL_BUNDLE_PURCHASE_STOCKS).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.error);
          reject(err);
        }
      })
    }))
  }

  updateStock(updatedStock: StockDTO): Promise<SimpleResponseDTO> {
    return new Promise<SimpleResponseDTO>(((resolve, reject) => {
      this.httpClient.put<SimpleResponseDTO>(GlobalVariables.CLIENT_ALL_BUNDLE_PURCHASES_URL + "/"
        + updatedStock.bundlePurchase.idBundlePurchase
        + GlobalVariables.ALL_BUNDLE_PURCHASE_STOCKS, updatedStock).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to update stock, Err = ", err.error);
          reject(err.error);
        }
      })
    }))
  }
}
