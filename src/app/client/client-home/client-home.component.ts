import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  alreadyClientClick() {
    this.router.navigate(['/appointments'], {
      queryParams: {
        makeClientResearch: true
      }
    });
  }

  newClientClick() {
    this.router.navigate(['/clients/registration'], {
      queryParams: {
        registrationForAppointment: true
      }
    });
  }

}
