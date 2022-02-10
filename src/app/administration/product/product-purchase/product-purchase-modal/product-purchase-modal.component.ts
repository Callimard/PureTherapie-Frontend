import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BundleDTO} from "../../../../../services/product/aesthetic/bundle/bundle-dto";
import {ClientService} from "../../../../../services/person/client/client.service";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/aesthetic-care-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {AuthenticationService} from "../../../../../services/auth/authentication.service";
import {SimpleClientInfoDTO} from "../../../../../services/person/client/simple-client-info-dto";
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {PersonTool} from "../../../../../tool/person-tool";
import {PersonDTO} from "../../../../../services/person/person-dto";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";

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
  clientFound?: SimpleClientInfoDTO;
  clientComplete?: ClientDTO;
  hasSearchClient = false;
  hasFoundClient = false;
  displaySearchClient = true;

  bundleToPurchase: BundleDTO = BundleDTO.default();
  acToPurchase: AestheticCareDTO = AestheticCareDTO.default();

  rechargeable?: { recharge(): () => void };

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
    if (this.clientFound != null)
      this.acService.purchaseAestheticCare(this.acToPurchase.idAestheticCare, this.clientFound.idPerson).then(() => {
        this.successACPurchase();
      }).catch(() => {
        this.failACPurchase();
      });
  }

  private successACPurchase() {
    this.modalService.show(SuccessModalComponent, {
      initialState: {
        title: "L'achat du soin ésthétique à réussie!",
        text: "L'achat du soin ésthétique " + this.acToPurchase.name + " a été pris en compte."
      }
    });
    this.bsModalRef.hide();
  }

  private failACPurchase() {
    this.modalService.show(FailModalComponent, {
      initialState: {
        title: "L'achat du soin ésthétique à échoué!",
        text: "L'achat du soin ésthétique " + this.acToPurchase.name + " N'A PAS ETE PRIS EN COMPTE."
      }
    });
  }

  purchaseBundle() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Confirmation de vente de package";
    confirmationModal.content.text = "Êtes-vous sur de vouloir vendre le package " + this.bundleToPurchase.name
    confirmationModal.content.confirmationFunction = () => this.proceedBundlePurchase();
  }

  private proceedBundlePurchase() {
    if (this.clientFound)
      this.bundleService.purchaseBundle(this.bundleToPurchase.idBundle, this.clientFound.idPerson).then(() => {
        this.successBundlePurchase();
      }).catch(() => {
        this.failBundlePurchase();
      });
  }

  private successBundlePurchase() {
    this.modalService.show(SuccessModalComponent, {
      initialState: {
        title: "L'achat du packages à réussie!",
        text: "L'achat du package " + this.bundleToPurchase.name + " a été pris en compte."
      }
    });
    this.rechargeable?.recharge();
    this.bsModalRef.hide();
  }

  private failBundlePurchase() {
    this.modalService.show(FailModalComponent, {
      initialState: {
        title: "L'achat du packages à échoué!",
        text: "L'achat du packages " + this.acToPurchase.name + "  N'A PAS ETE PRIS EN COMPTE."
      }
    });
  }

  getClientSimpleIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

  foundClient(client: SimpleClientInfoDTO) {
    this.clientFound = client;
  }

}
