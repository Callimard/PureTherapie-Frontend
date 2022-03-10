import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {HistoricalModalComponent} from "../historical-modal/historical-modal.component";
import {DateTool} from "../../../../../tool/date-tool";
import {HistoricalViewDto} from "../../../../../services/historical/historical-view-dto";
import {HistoricalService} from "../../../../../services/historical/historical.service";

@Component({
  selector: 'app-historical-tab-row',
  templateUrl: './historical-tab-row.component.html',
  styleUrls: ['./historical-tab-row.component.css'],
  host: {'class': 'historical-tab-row'}
})
export class HistoricalTabRowComponent implements OnInit {

  @Input() historicalView: HistoricalViewDto = HistoricalViewDto.default();
  @Output() historicalUpdated = new EventEmitter<any>();

  constructor(private historicalService: HistoricalService, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  onClick() {
    let historicalModal: BsModalRef = this.modalService.show(HistoricalModalComponent, {
      class: 'medium-modal'
    });
    historicalModal.content.historical = this.historicalView.historical;
    this.historicalService.setHistoricalViewed(this.historicalView.idHistoricalView).then(() => {
      this.historicalUpdated.emit(null);
    });
  }

  formatDateTime(dateTime: string): string {
    return DateTool.readableDateTime(dateTime);
  }


}
