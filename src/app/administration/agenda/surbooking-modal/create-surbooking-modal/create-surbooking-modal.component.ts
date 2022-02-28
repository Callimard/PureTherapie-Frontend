import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {SimpleClientInfoDTO} from "../../../../../services/person/client/simple-client-info-dto";
import {AestheticCareDTO} from "../../../../../services/product/aesthetic/care/dto/aesthetic-care-dto";
import {TechnicianDTO} from "../../../../../services/person/technician/technician-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {TechnicianService} from "../../../../../services/person/technician/technician.service";
import {DateTool} from "../../../../../tool/date-tool";
import {Rechargeable} from "../../../../../tool/rechargeable";

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
  selectedTechnician: TechnicianDTO = TechnicianDTO.default();
  selectedDay: string = DateTool.toMySQLDateString(new Date());

  rechargeable?: Rechargeable;

  constructor(private acService: AestheticCareService, private technicianService: TechnicianService,
              public bsRef: BsModalRef) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeAestheticCares();
    this.chargeTechnician();
  }

  private chargeAestheticCares() {
    this.acService.getAllAestheticCare().then(res => {
      this.allACs = res;
      this.selectedAC = this.allACs[0];
    });
  }

  private chargeTechnician() {
    this.technicianService.getAllTechnicians().then(res => {
      this.allTechnicians = res;
      this.selectedTechnician = this.allTechnicians[0];
    });
  }

  close() {
    this.bsRef.hide();
  }

  updateClient(client: SimpleClientInfoDTO) {
    this.client = client;
  }

}
