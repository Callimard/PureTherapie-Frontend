import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BundleDTO} from "../../../../../services/product/aesthetic/bundle/bundle-dto";
import {ClientService} from "../../../../../services/person/client/client.service";
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {AuthenticationService} from "../../../../../services/auth/authentication.service";

@Component({
  selector: 'app-product-purchase-modal',
  templateUrl: './product-purchase-modal.component.html',
  styleUrls: ['./product-purchase-modal.component.css']
})
export class ProductPurchaseModalComponent implements OnInit {

  /**
   * True -> display package purchase / false -> display session purchase
   */
  modePackage = true;

  emailClient: string = '';
  clientFound = ClientDTO.default();
  hasSearchClient = false;
  hasFoundClient = false;

  bundleToPurchase: BundleDTO = BundleDTO.default();
  acToPurchase: AestheticCareDTO = AestheticCareDTO.default();

  constructor(private clientService: ClientService, private acService: AestheticCareService,
              private bundleService: BundleService, private authenticationService: AuthenticationService,
              public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
  }

  close() {
    this.bsModalRef?.hide();
  }

  searchClient() {
    this.clientService.searchClientWithEmail(this.emailClient).then((client) => {
      this.hasSearchClient = true;
      this.clientFound = client;
      this.hasFoundClient = this.clientFound != null;
    }).catch(() => {
      this.hasSearchClient = true;
      this.hasFoundClient = false;
    })
  }

  purchaseAC() {
    this.acService.purchaseAestheticCare(this.acToPurchase.idAestheticCare, this.clientFound.idPerson).then(() => {
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "L'achat du soin ésthétique à réussie!",
          text: "L'achat du soin ésthétique " + this.acToPurchase.name + " par le client " + this.clientFound.lastName
            + " " + this.clientFound.firstName + " a été pris en compte."
        }
      });
    }).catch(() => {
      this.modalService.show(FailModalComponent, {
        initialState: {
          title: "L'achat du soin ésthétique à échoué!",
          text: "L'achat du soin ésthétique " + this.acToPurchase.name + " par le client " + this.clientFound.lastName
            + " " + this.clientFound.firstName + " N'A PAS ETE PRIS EN COMPTE."
        }
      });
    });
  }

  purchaseBundle() {
    this.bundleService.purchaseBundle(this.bundleToPurchase.idBundle, this.clientFound.idPerson).then(() => {
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "L'achat du packages à réussie!",
          text: "L'achat du package " + this.bundleToPurchase.name + " par le client " + this.clientFound.lastName
            + " " + this.clientFound.firstName + " a été pris en compte."
        }
      });
    }).catch(() => {
      this.modalService.show(FailModalComponent, {
        initialState: {
          title: "L'achat du packages à échoué!",
          text: "L'achat du packages " + this.acToPurchase.name + " par le client " + this.clientFound.lastName
            + " " + this.clientFound.firstName + " N'A PAS ETE PRIS EN COMPTE."
        }
      });
    });
  }

}
