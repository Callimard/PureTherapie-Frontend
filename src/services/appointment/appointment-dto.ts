export class AppointmentDTO {
  constructor(public idClient: number,
              public idTechnician: number,
              public idAestheticCare: number,
              public day: string,
              public beginTime: string,
              public overlapAuthorized: number) {
  }
}
