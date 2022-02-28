import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BundleDTO} from "../../../../../services/product/aesthetic/bundle/dto/bundle-dto";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {Rechargeable} from "../../../../../tool/rechargeable";

@Component({
  selector: 'app-update-bundle-modal',
  templateUrl: './update-bundle-modal.component.html',
  styleUrls: ['./update-bundle-modal.component.css']
})
export class UpdateBundleModalComponent implements OnInit {

  bundle: BundleDTO = BundleDTO.default();

  rechargeable?: Rechargeable;

  constructor(private bundleService: BundleService, public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  close() {
    this.bsRef.hide();
  }

  confirmUpdateBundle() {
    let confirmModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmModal.content.title = "Confirmation de mise à jour de package";
    confirmModal.content.text = "Êtes-vous sûr de vouloir mettre à jour le package?";
    confirmModal.content.confirmationFunction = () => this.updateBundle();
  }

  private updateBundle() {
    console.error("Bundle to update = ", this.bundle);

    this.bundleService.updateBundle(this.bundle).then(() => this.successUpdateBundle())
      .catch((err) => this.failUpdateBundle(err));
  }

  private successUpdateBundle() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Mise à jour du package réussie";
    successModal.content.text = "La mise à jour du nouveau package a été prise en compte";
    this.rechargeable?.recharge();
    this.bsRef.hide();
  }

  private failUpdateBundle(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Mise à jour de package échouée";
    failModal.content.text = "La mise à jour du nouveau package n'a pas été prise en compte. Err = " + err;
  }
}
