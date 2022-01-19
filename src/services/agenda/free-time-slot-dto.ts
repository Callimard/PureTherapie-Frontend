export class FreeTimeSlotDTO {
  constructor(public idTechnician: number, public day: string, public begin: string, public duration: number) {
  }

  public static default(): FreeTimeSlotDTO {
    return new FreeTimeSlotDTO(-1, "DEFAULT FTS", "DEFAULT FTS", -1);
  }
}
