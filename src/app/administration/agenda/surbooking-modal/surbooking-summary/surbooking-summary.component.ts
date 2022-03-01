import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SurbookingDTO} from "../../../../../services/appointment/dto/surbooking-dto";
import {PersonDTO} from "../../../../../services/person/person-dto";
import {PersonTool} from "../../../../../tool/person-tool";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {Rechargeable} from "../../../../../tool/rechargeable";
import {ClientArrivalModalComponent} from "../../client-arrival-modal/client-arrival-modal.component";

@Component({
  selector: 'app-surbooking-summary',
  templateUrl: './surbooking-summary.component.html',
  styleUrls: ['./surbooking-summary.component.css']
})
export class SurbookingSummaryComponent implements OnInit, Rechargeable {

  surbooking: SurbookingDTO = SurbookingDTO.default();

  acStock: number = -1;

  rechargeable?: Rechargeable;

  constructor(private acService: AestheticCareService, public bsRef: BsModalRef, private modalService: BsModalService) {
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

  demandCancelSurbooking() {
    // TODO
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
