import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SurbookingDTO} from "../../../../../services/appointment/dto/surbooking-dto";
import {PersonDTO} from "../../../../../services/person/person-dto";
import {PersonTool} from "../../../../../tool/person-tool";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {Rechargeable} from "../../../../../tool/rechargeable";
import {ClientArrivalModalComponent} from "../../client-arrival-modal/client-arrival-modal.component";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {SurbookingService} from "../../../../../services/appointment/surbooking.service";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-surbooking-summary',
  templateUrl: './surbooking-summary.component.html',
  styleUrls: ['./surbooking-summary.component.css']
})
export class SurbookingSummaryComponent implements OnInit, Rechargeable {

  surbooking: SurbookingDTO = SurbookingDTO.default();

  acStock: number = -1;

  rechargeable?: Rechargeable;

  constructor(private surbookingService: SurbookingService, private acService: AestheticCareService,
              public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  recharge() {
    this.chargeACStock();
  }

  private chargeACStock() {
    this.acService.getClientStockOfAC(this.surbooking.client.idPerson, this.surbooking.aestheticCare.idAestheticCare).then((res) => {
      this.acStock = res;
    }).catch(() => {
      console.error("Fail to charge client ac stock");
    })
  }

  close() {
    this.bsRef.hide();
  }

  personSimpleIdentifier(person: PersonDTO): string {
    return PersonTool.formatPersonSimpleIdentifier(person);
  }

  confirmCancelSurbooking() {
    let cancelSurbookingModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    cancelSurbookingModal.content.title = "Confimer l'annulation du surbooking";
    cancelSurbookingModal.content.text = "Voulez-vous vraiment annuler le surbooking du client";
    cancelSurbookingModal.content.confirmationFunction = () => this.cancelSurbooking();
    cancelSurbookingModal.content.parent = this.bsRef;
  }

  private cancelSurbooking() {
    this.surbookingService.cancelSurbooking(this.surbooking.idSurbooking).then(() => {
      this.successCancelSurbooking();
    }).catch((err) => {
      this.failCancelSurbooking(err);
    });
  }

  private successCancelSurbooking() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "L'annulation de surbooking réussie";
    successModal.content.text = "L'annulation du surbooking a été pris en compte.";
    this.rechargeable?.recharge();
    this.bsRef.hide();
  }

  private failCancelSurbooking(err: any) {
    let successModal: BsModalRef = this.modalService.show(FailModalComponent);
    successModal.content.title = "L'annulation de surbooking n'a pas réussie";
    successModal.content.text = "L'annulation du surbooking n'a été pris en compte. Err = " + err;
  }

  clientArrive() {
    let clientArrivalModal: BsModalRef = this.modalService.show(ClientArrivalModalComponent);
    clientArrivalModal.content.clientAppointment = this.surbooking;
    clientArrivalModal.content.parent = this.bsRef;
    clientArrivalModal.content.modeSurbooking = true;
    clientArrivalModal.content.surbooking = this.surbooking;
  }

  terminateClient() {
    // TODO
  }
}
