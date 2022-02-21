import {NotificationDTO} from "./notification-dto";

export class NotificationViewDTO {

  constructor(public idNotificationView: number,
              public viewed: boolean,
              public notification: NotificationDTO) {
  }

  public static default() {
    return new NotificationViewDTO(-1, false, NotificationDTO.default());
  }

}
