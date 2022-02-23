import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NotificationViewDTO} from "../../../../services/notificaiton/notification-view-dto";
import {NotificationService} from "../../../../services/notificaiton/notification.service";

@Component({
  selector: 'app-notification-tab',
  templateUrl: './notification-tab.component.html',
  styleUrls: ['./notification-tab.component.css'],
  host: {'class': 'notification-tab'}
})
export class NotificationTabComponent implements OnInit, OnChanges {

  @Input() filter: number = 0;

  notificationViews: NotificationViewDTO[] = [];

  constructor(private notificationService: NotificationService) {
    // Normal
  }

  ngOnInit(): void {
    this.chargeNotifications();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chargeNotifications();
  }

  private chargeNotifications() {
    this.notificationService.getUserNotifications(this.filter).then((res) => {
      this.notificationViews = [...res].sort((nV1, nV2) => {
        if (nV1.notification.creationDate > nV2.notification.creationDate)
          return 1;
        else if (nV1.notification.creationDate < nV2.notification.creationDate)
          return -1;
        else return 0;
      }).reverse();
    }).catch(() => {
      console.error("Fail to get user notifications");
    })
  }

  notificationUpdated() {
    this.chargeNotifications();
  }

}
