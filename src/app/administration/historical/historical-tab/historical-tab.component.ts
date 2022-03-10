import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HistoricalViewDto} from "../../../../services/historical/historical-view-dto";
import {HistoricalService} from "../../../../services/historical/historical.service";

@Component({
  selector: 'app-historical-tab',
  templateUrl: './historical-tab.component.html',
  styleUrls: ['./historical-tab.component.css'],
  host: {'class': 'historical-tab'}
})
export class HistoricalTabComponent implements OnInit, OnChanges {

  @Input() filter: number = 0;

  historicalViews: HistoricalViewDto[] = [];

  constructor(private historicalService: HistoricalService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeNotifications();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chargeNotifications();
  }

  private chargeNotifications() {
    this.historicalService.getUserHistorical(this.filter).then((res) => {
      this.historicalViews = [...res].sort((nV1, nV2) => {
        if (nV1.historical.creationDate > nV2.historical.creationDate)
          return 1;
        else if (nV1.historical.creationDate < nV2.historical.creationDate)
          return -1;
        else return 0;
      }).reverse();
    }).catch(() => {
      console.error("Fail to get user historical");
    })
  }

  notificationUpdated() {
    this.chargeNotifications();
  }

}
