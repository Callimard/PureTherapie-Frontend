import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css'],
  host: {'class': 'd-flex flex-column flex-grow-1'}
})
export class HistoricalComponent implements OnInit {

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
