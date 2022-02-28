import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BundleDTO} from "./dto/bundle-dto";
import {GlobalVariables} from "../../../../global/global-variables";
import {SimpleResponseDTO} from "../../../util/simple-response-dto";
import {BundlePurchaseDTO} from "./dto/bundle-purchase-dto";
import {StockDTO} from "./dto/stock-dto";
import {BundleCreationParameter} from "./parameter/bundle-creation-parameter";

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  constructor(private httpClient: HttpClient) {
  }

  public createBundle(bundleName: string, bundlePrice: number, bundleStock: number[][]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post<any>(GlobalVariables.BUNDLES_URL, new BundleCreationParameter(bundleName, bundlePrice, bundleStock))
        .subscribe({
          next: res => resolve(res),
          error: (err: HttpErrorResponse) => {
            console.error("Fail to create new bundle, Err = ", err.error);
            reject(err.error);
          }
        });
    });
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

  public purchaseBundle(idBundle: number, idClient: number, customPrice?: number, idPaymentType?: number): Promise<SimpleResponseDTO> {
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

  public getAllClientBundlePurchases(idClient: number): Promise<BundlePurchaseDTO[]> {
    return new Promise<BundlePurchaseDTO[]>(((resolve, reject) => {
      this.httpClient.get<BundlePurchaseDTO[]>(GlobalVariables.CLIENT_ALL_BUNDLE_PURCHASES_URL + "?idClient=" + idClient).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all client bundle purchases");
          reject(err.error);
        }
      })
    }));
  }

  public getClientBundlePurchase(idBundlePurchase: number): Promise<BundlePurchaseDTO> {
    return new Promise<BundlePurchaseDTO>((resolve, reject) => {
      this.httpClient.get<BundlePurchaseDTO>(GlobalVariables.CLIENT_ALL_BUNDLE_PURCHASES_URL + "/" + idBundlePurchase)
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err: HttpErrorResponse) => {
            console.error("Fail to get bundle purchase, Err = ", err.error);
            reject(err.error);
          }
        })
    })
  }

  public getAllStocks(idBundlePurchase: number): Promise<StockDTO[]> {
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

  public updateStock(updatedStock: StockDTO): Promise<SimpleResponseDTO> {
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

  public getAllUnpaidBundlePurchases(idClient: number): Promise<BundlePurchaseDTO[]> {
    return new Promise<BundlePurchaseDTO[]>(((resolve, reject) => {
      this.httpClient.get<BundlePurchaseDTO[]>(GlobalVariables.UNPAID_BUNDLE_PURCHASES
        + "?idClient=" + idClient).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Fail to get all unpaid bundle purchases. Err = ", err.error);
          reject(err.error);
        }
      });
    }));
  }
}
