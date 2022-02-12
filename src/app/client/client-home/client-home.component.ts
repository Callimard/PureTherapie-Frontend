import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalVariables} from "../../../global/global-variables";

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
  host: {'class': 'client-home'}
})
export class ClientHomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // Normal
  }

  alreadyClientClick() {
    this.router.navigate(['/' + GlobalVariables.INTERN_APPOINTMENTS_URL], {
      queryParams: {
        makeClientResearch: true
      }
    });
  }

  newClientClick() {
    this.router.navigate(['/' + GlobalVariables.INTERN_APPOINTMENTS_URL], {
      queryParams: {
        newClient: true
      }
    });
  }

}
