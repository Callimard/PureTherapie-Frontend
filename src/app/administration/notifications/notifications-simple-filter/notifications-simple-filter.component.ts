import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-notifications-simple-filter',
  templateUrl: './notifications-simple-filter.component.html',
  styleUrls: ['./notifications-simple-filter.component.css'],
  host: {'class': 'notification-simple-filter'}
})
export class NotificationsSimpleFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<number>();

  private static readonly FILTER_NUMBER = 3;
  activeFilter: number = 0;

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  changeActiveFilter(filter: number) {
    if (filter == this.activeFilter)
      return;

    if (filter >= NotificationsSimpleFilterComponent.FILTER_NUMBER)
      this.activeFilter = NotificationsSimpleFilterComponent.FILTER_NUMBER - 1;
    else if (filter < 0)
      this.activeFilter = 0;
    else
      this.activeFilter = filter;

    this.filterChange.emit(this.activeFilter);
  }

}
