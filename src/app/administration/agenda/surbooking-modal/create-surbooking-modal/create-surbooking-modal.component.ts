import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SimpleClientInfoDTO} from "../../../../../services/person/client/simple-client-info-dto";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/dto/aesthetic-care-dto";
import {TechnicianDTO} from "../../../../../services/person/technician/technician-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {TechnicianService} from "../../../../../services/person/technician/technician.service";
import {DateTool} from "../../../../../tool/date-tool";
import {Rechargeable} from "../../../../../tool/rechargeable";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SurbookingService} from "../../../../../services/appointment/surbooking.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";

@Component({
  selector: 'app-create-surbooking-modal',
  templateUrl: './create-surbooking-modal.component.html',
  styleUrls: ['./create-surbooking-modal.component.css']
})
export class CreateSurbookingModalComponent implements OnInit {

  client?: SimpleClientInfoDTO;

  allACs: AestheticCareDTO[] = [];
  allTechnicians: TechnicianDTO[] = [];

  selectedAC: AestheticCareDTO = AestheticCareDTO.default();
  selectedDay: string = DateTool.toMySQLDateString(new Date());
  selectedTime: string = "12:00";

  rechargeable?: Rechargeable;

  constructor(private surbookingService: SurbookingService, private acService: AestheticCareService,
              private technicianService: TechnicianService,
              public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
  }

  private chargeAestheticCares() {
    this.acService.getAllAestheticCare().then(res => {
      this.allACs = res;
      this.selectedAC = this.allACs[0];
    });
  }

  close() {
    this.bsRef.hide();
  }

  updateClient(client: SimpleClientInfoDTO) {
    this.client = client;
  }

  confirmCreateSurbooking() {
    let confirmModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmModal.content.title = "Confirmation création de surbooking";
    confirmModal.content.text = "Êtes-vous sûr de vouloir créer un surbooking?";
    confirmModal.content.confirmationFunction = () => this.createSurbooking();
  }

  private createSurbooking() {
    if (this.client != null) {
      this.surbookingService.createSurbooking(this.client.idPerson, this.selectedAC.idAestheticCare, this.selectedDay,
        this.selectedTime + ":00").then(() => this.successCreateSurbooking())
        .catch((err) => this.failCreateSurbooking(err));
    }
  }


  private successCreateSurbooking() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Création du surbooking réussie";
    successModal.content.text = "La création du surbooking a réussie.";
    this.rechargeable?.recharge();
    this.bsRef.hide();
  }

  private failCreateSurbooking(err: any) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Création du surbooking échoué";
    failModal.content.text = "La création du surbooking n'a pas réussie, Err = " + err;

  }
}
