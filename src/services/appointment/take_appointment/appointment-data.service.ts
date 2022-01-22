import {Injectable} from '@angular/core';
import {AppointmentData} from "./appointment-data";

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  private appointmentData?: AppointmentData;

  constructor() {
  }

  public replaceData(appointmentData: AppointmentData) {
    this.appointmentData = appointmentData;
  }

  public getData(): AppointmentData | undefined {
    return this.appointmentData;
  }

  public consumeData(): AppointmentData | undefined {
    let data = this.appointmentData;
    this.appointmentData = undefined;
    return data;
  }
}
