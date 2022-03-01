import {Component, OnInit} from '@angular/core';
import {Rechargeable} from "../../../../../tool/rechargeable";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/dto/aesthetic-care-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-create-bundle-modal',
  templateUrl: './create-bundle-modal.component.html',
  styleUrls: ['./create-bundle-modal.component.css'],
  host: {'class': 'd-flex flex-fill'}
})
export class CreateBundleModalComponent implements OnInit {

  allAcs: AestheticCareDTO[] = [];

  selectedBundleName: string = "";
  selectedBundlePrice: number = -1;

  bundleACPs: ACPackage[] = [];

  rechargeable?: Rechargeable;

  constructor(private bundleService: BundleService, private acService: AestheticCareService,
              public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeAllACs();
    this.computeAdvicePrice();
  }

  private chargeAllACs() {
    this.acService.getAllAestheticCare().then(res => this.allAcs = res);
  }

  close() {
    this.bsRef.hide();
  }

  addACIntoBundle(ac: AestheticCareDTO) {
    this.allAcs.splice(this.allAcs.indexOf(ac), 1);
    this.bundleACPs.push(new ACPackage(ac, 5));
    this.computeAdvicePrice();
  }

  removeACFromBundle(acP: ACPackage) {
    this.bundleACPs.splice(this.bundleACPs.indexOf(acP), 1);
    this.allAcs.push(acP.ac);
    this.computeAdvicePrice();
  }

  private computeAdvicePrice() {
    this.selectedBundlePrice = 0.0;
    for (let acP of this.bundleACPs) {
      this.selectedBundlePrice += (acP.ac.price * acP.quantity);
    }
  }

  quantityChange() {
    this.computeAdvicePrice();
  }

  confirmBundleCreation() {
    let confirmModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmModal.content.title = "Confirmation de création de bundle";
    confirmModal.content.text = "Êtes-vous sûr de vouloir créer un nouveau bundle?";
    confirmModal.content.confirmationFunction = () => this.createBundle();
  }

  private createBundle() {
    let bundleStock: number[][] = [];

    for (let acP of this.bundleACPs) {
      bundleStock.push([acP.ac.idAestheticCare, acP.quantity]);
    }

    this.bundleService.createBundle(this.selectedBundleName, this.selectedBundlePrice, bundleStock).then(() => {
      this.successCreateBundle();
    }).catch(err => {
      this.failCreateBundle(err);
    })
  }

  private successCreateBundle() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Création de package réussie";
    successModal.content.text = "La création du nouveau package a été prise en compte";
    this.rechargeable?.recharge();
    this.bsRef.hide();
  }

  private failCreateBundle(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Création de package échouée";
    failModal.content.text = "La création du nouveau package n'a pas été prise en compte. Err = " + err;
  }
}

class ACPackage {

  constructor(public ac: AestheticCareDTO, public quantity: number) {
  }

}
