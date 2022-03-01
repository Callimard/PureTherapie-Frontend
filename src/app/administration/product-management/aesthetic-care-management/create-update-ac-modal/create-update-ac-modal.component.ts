import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Rechargeable} from "../../../../../tool/rechargeable";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/dto/aesthetic-care-dto";

@Component({
  selector: 'app-create-update-ac-modal',
  templateUrl: './create-update-ac-modal.component.html',
  styleUrls: ['./create-update-ac-modal.component.css']
})
export class CreateUpdateAcModalComponent implements OnInit {

  rechargeable?: Rechargeable;

  ac: AestheticCareDTO = AestheticCareDTO.default();
  updatedMode: boolean = false;

  constructor(private acService: AestheticCareService, public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    if (!this.updatedMode)
      this.initACValue();
  }

  private initACValue() {
    this.ac.name = "";
    this.ac.price = 39.99;
    this.ac.executionTime = 30;
  }

  close() {
    this.bsRef.hide();
  }

  confirmCreation() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Confirmation de création de Soin";
    confirmationModal.content.text = "Êtes-vous sûr de vouloir créer un nouveau soin?"
    confirmationModal.content.confirmationFunction = () => {
      if (!this.updatedMode)
        this.createNewAC();
      else
        this.updateAC();
    };
  }

  private createNewAC() {
    this.acService.createAC(this.ac.name, this.ac.price, this.ac.executionTime).then(() => {
      this.acCreationSuccess();
    }).catch((err) => this.acCreationFail(err))
  }

  private acCreationSuccess() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Création du soin ésthétique réussie";
    successModal.content.text = "La création du soin ésthétique a été prise en compte";
    this.rechargeable?.recharge();
    this.bsRef.hide();
  }

  private acCreationFail(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Création du soin ésthétique échouée";
    failModal.content.text = "La création du soin ésthétique a été prise en compte, Err = " + err;
  }

  private updateAC() {
    this.acService.updateAC(this.ac.idAestheticCare, this.ac.name, this.ac.price, this.ac.executionTime).then(() => {
      this.acUpdateSuccess();
    }).catch((err) => this.acUpdateFail(err));
  }

  private acUpdateSuccess() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Mise à jour du soin ésthétique réussie";
    successModal.content.text = "La mise à jour du soin ésthétique a été prise en compte";
    this.rechargeable?.recharge();
    this.bsRef.hide();
  }

  private acUpdateFail(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Mise à jour du soin ésthétique échouée";
    failModal.content.text = "La mise à du soin ésthétique a été prise en compte, Err = " + err;
  }

}
