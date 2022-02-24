import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientDTO} from "../../../../../../../../services/person/client/client-dto";
import {PurchaseDTO} from "../../../../../../../../services/product/bill/purchase-dto";
import {BillService} from "../../../../../../../../services/product/bill/bill.service";
import {DateTool} from "../../../../../../../../tool/date-tool";

@Component({
  selector: 'app-client-purchases',
  templateUrl: './client-purchases.component.html',
  styleUrls: ['./client-purchases.component.css'],
  host: {'class': 'client-purchases'}
})
export class ClientPurchasesComponent implements OnInit, OnChanges {

  @Input() client?: ClientDTO;

  clientPurchases: PurchaseDTO[] = [];

  constructor(private billService: BillService) {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chargeClientPurchases();
  }

  private chargeClientPurchases() {
    if (this.client != null && this.client.idPerson > 0) {
      this.billService.getAllClientPurchases(this.client.idPerson).then(res => {
        this.clientPurchases = [...res].sort((p1, p2) => {
          if (p1.date < p2.date)
            return 1;
          else if (p1.date > p2.date)
            return -1;
          else return 0;
        });
      })
    }
  }

  formatDateTime(dateTime: string): string {
    return DateTool.readableDateTime(dateTime);
  }

}
