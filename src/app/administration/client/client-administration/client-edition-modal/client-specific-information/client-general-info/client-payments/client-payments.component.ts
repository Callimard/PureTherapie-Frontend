import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientDTO} from "../../../../../../../../services/person/client/client-dto";
import {PaymentDTO} from "../../../../../../../../services/product/bill/payment-dto";
import {BillService} from "../../../../../../../../services/product/bill/bill.service";

@Component({
  selector: 'app-client-payments',
  templateUrl: './client-payments.component.html',
  styleUrls: ['./client-payments.component.css'],
  host: {'class': 'client-payments'}
})
export class ClientPaymentsComponent implements OnInit, OnChanges {

  @Input() client?: ClientDTO;

  clientsPayments: PaymentDTO[] = [];

  constructor(private billService: BillService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chargeClientPayments();
  }


  private chargeClientPayments() {
    if (this.client != null && this.client.idPerson > 0)
      this.billService.getAllClientPayments(this.client.idPerson).then(res => {
        this.clientsPayments = res;
      })
  }

}
