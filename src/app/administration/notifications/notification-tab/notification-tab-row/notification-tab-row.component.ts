import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NotificationModalComponent} from "../notification-modal/notification-modal.component";
import {DateTool} from "../../../../../tool/date-tool";
import {NotificationViewDTO} from "../../../../../services/notificaiton/notification-view-dto";
import {NotificationService} from "../../../../../services/notificaiton/notification.service";

@Component({
  selector: 'app-notification-tab-row',
  templateUrl: './notification-tab-row.component.html',
  styleUrls: ['./notification-tab-row.component.css'],
  host: {'class': 'notification-tab-row'}
})
export class NotificationTabRowComponent implements OnInit {

  @Input() notificationView: NotificationViewDTO = NotificationViewDTO.default();
  @Output() notificationUpdated = new EventEmitter<any>();

  constructor(private notificationService: NotificationService, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  onClick() {
    let notificationModal: BsModalRef = this.modalService.show(NotificationModalComponent, {
      class: 'medium-modal'
    });
    notificationModal.content.notification = this.notificationView.notification;
    this.notificationService.setNotificationViewed(this.notificationView.idNotificationView).then(() => {
      this.notificationUpdated.emit(null);
    });
  }

  formatDateTime(dateTime: string): string {
    return DateTool.readableDateTime(dateTime);
  }


}
