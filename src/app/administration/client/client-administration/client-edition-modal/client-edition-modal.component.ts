import {Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../../../../services/person/client/client-dto";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ClientService} from "../../../../../services/person/client/client.service";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {BundlePurchaseDTO} from "../../../../../services/product/aesthetic/bundle/bundle-purchase-dto";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {BillDTO} from "../../../../../services/product/bill/bill-dto";
import {DateTool} from "../../../../../services/agenda/date-tool";
import {SessionPurchaseDTO} from "../../../../../services/product/aesthetic/care/session-purchase-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";

@Component({
  selector: 'app-client-edition-modal',
  templateUrl: './client-edition-modal.component.html',
  styleUrls: ['./client-edition-modal.component.css'],
  host: {'class': 'd-flex flex-fill'}
})
export class ClientEditionModalComponent implements OnInit {

  baseClient: ClientDTO = ClientDTO.default();
  updatedClient: ClientDTO = ClientDTO.default();

  clientBundlePurchases: BundlePurchaseDTO[] = [];
  clientSessionPurchases: SessionPurchaseDTO[] = [];

  constructor(private clientService: ClientService, private bundleService: BundleService,
              private acService: AestheticCareService, public bsModalRef: BsModalRef,
              private modalService: BsModalService
  ) {
  }

  ngOnInit()
    :
    void {
    this.recharge();
  }

  recharge() {
    this.chargeClientBundlePurchases();
    this.chargeClientSessionPurchases();
  }

  private chargeClientBundlePurchases() {
    this.bundleService.getAllClientBundlePurchases(this.baseClient.idPerson).then((res) => {
      this.clientBundlePurchases = res;
    }).catch(() => {
      console.error("Fail to charge all client bundle purchases");
    })
  }

  private chargeClientSessionPurchases() {
    this.acService.getAllClientACPurchases(this.baseClient.idPerson).then((res) => {
      this.clientSessionPurchases = res;
    }).catch(() => {
      console.error("Fail to charge all client ac purchases");
    })
  }

  closeClientEditionModal() {
    this.bsModalRef?.hide();
  }

  updateChange()
    :
    void {
    this.clientService.updateClient(this.updatedClient).then(() => {
      this.modalService.show(SuccessModalComponent, {
        initialState: {
          title: "Mise à jour des données client réussie",
          text: "Les données du client on put être mise à jour"
        }
      });
    }).catch(() => {
      this.modalService.show(FailModalComponent, {
        initialState: {
          title: "Mise à jour des données client non effectuée",
          text: "La mise à jour des données client n'a pu être mise à jour"
        }
      })
    })
  }

  extractOnlyDay(dateTime
                   :
                   string
  ):
    string {
    return DateTool.extractOnlyDay(dateTime);
  }

  billIsTotallyPaid(bill
                      :
                      BillDTO
  ) {
    let amountPaid = 0;
    for (let payment of bill.payments) {
      amountPaid += payment.amountPaid;
    }

    return amountPaid == bill.purchasePrice;
  }

  billPartiallyPaid(bill
                      :
                      BillDTO
  ) {
    let amountPaid = 0;
    for (let payment of bill.payments) {
      amountPaid += payment.amountPaid;
    }

    return amountPaid > 0;
  }

}
