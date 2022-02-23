export class NotificationDTO {

  constructor(public idNotification: number,
              public type: boolean,
              public notificationTitle: string,
              public text: string,
              public creationDate: string) {
  }

  public static default(): NotificationDTO {
    return new NotificationDTO(-1, false, "DEFAULT_NOTIFICATION",
      "DEFAULT_NOTIFICATION", "2022-01-01");
  }

}
