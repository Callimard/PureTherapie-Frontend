import {Component, OnInit, Type} from '@angular/core';

@Component({
  selector: 'app-take-appointment-confirm-modal',
  templateUrl: './take-appointment-confirm-modal.component.html',
  styleUrls: ['./take-appointment-confirm-modal.component.css']
})
export class TakeAppointmentConfirmModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}

const MODALS: {[name: string]: Type<any>} = {
  autofocus: TakeAppointmentConfirmModalComponent
};
