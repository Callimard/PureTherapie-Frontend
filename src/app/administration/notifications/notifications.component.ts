import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class NotificationsComponent implements OnInit {

  currentFilter: number = 0;

  constructor(private authenticationService: AuthenticationService) {
    // Normal
  }

  ngOnInit(): void {
    this.authenticationService.checkLogin();
  }

  filterChange(filter: number) {
    this.currentFilter = filter;
  }

}
