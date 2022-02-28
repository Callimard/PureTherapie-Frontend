import {Component, OnInit} from '@angular/core';
import {AestheticCareDTO} from "../../../../services/product/aesthetic/care/aesthetic-care-dto";

@Component({
  selector: 'app-aesthetic-care-management',
  templateUrl: './aesthetic-care-management.component.html',
  styleUrls: ['./aesthetic-care-management.component.css'],
  host: {'class': 'aesthetic-care-management'}
})
export class AestheticCareManagementComponent implements OnInit {

  acs: AestheticCareDTO[] = [];

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.acs.push(AestheticCareDTO.default());
    }
  }

}
