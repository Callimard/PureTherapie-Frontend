export class TakeAppointmentDTO {
  constructor(public idClient: number,
              public idTechnician: number,
              public idAestheticCare: number,
              public day: string,
              public beginTime: string,
              public overlapAuthorized: boolean = false) {
  }
}
