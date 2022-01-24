import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BundleDTO} from "./bundle-dto";
import {GlobalVariables} from "../../../../global/global-variables";

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
}
