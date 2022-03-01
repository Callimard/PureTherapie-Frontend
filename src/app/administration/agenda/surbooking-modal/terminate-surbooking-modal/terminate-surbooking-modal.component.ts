import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BundlePurchaseDTO} from "../../../../../services/product/aesthetic/bundle/dto/bundle-purchase-dto";
import {SessionPurchaseDTO} from "../../../../../services/product/aesthetic/care/dto/session-purchase-dto";
import {AestheticCareService} from "../../../../../services/product/aesthetic/care/aesthetic-care.service";
import {BundleService} from "../../../../../services/product/aesthetic/bundle/bundle.service";
import {ClientService} from "../../../../../services/person/client/client.service";
import {Rechargeable} from "../../../../../tool/rechargeable";
import {
  BundlePurchaseModalComponent
} from "../../../product-purchase/bundle-purchase-modal/bundle-purchase-modal.component";
import {BillService} from "../../../../../services/product/bill/bill.service";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {SimpleResponseDTO} from "../../../../../services/util/simple-response-dto";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {SurbookingService} from "../../../../../services/appointment/surbooking.service";
import {SurbookingDTO} from "../../../../../services/appointment/dto/surbooking-dto";

@Component({
  selector: 'app-terminate-surbooking-modal',
  templateUrl: './terminate-surbooking-modal.component.html',
  styleUrls: ['./terminate-surbooking-modal.component.css']
})
export class TerminateSurbookingModalComponent implements OnInit, Rechargeable {

  surbooking: SurbookingDTO = SurbookingDTO.default();

  clientUnpaidBundlePurchases: BundlePurchaseDTO[] = [];
  clientUnpaidACPurchases: SessionPurchaseDTO[] = [];
  clientACStock: number = -1;

  clientHasPaidToday: boolean = false;

  parent?: BsModalRef;

  rechargeable?: Rechargeable;

  constructor(private clientService: ClientService, private acService: AestheticCareService, private bundleService: BundleService,
              private billService: BillService, private surbookingService: SurbookingService,
              public bsRef: BsModalRef, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.recharge();
  }

  recharge(): void {
    this.chargeACStock();
    this.chargeAllUnpaidBundlePurchases();
    this.chargeAllUnpaidACPurchases();
    this.verifyClientHasPaidToday();
  }

  close() {
    this.bsRef.hide();
  }

  private chargeACStock() {
    this.clientService.getClientRemainingStockAndPay(this.surbooking.client.idPerson).then((res) => {
      this.clientACStock = res.remainingStock;
    }).catch(() => {
      console.error("Fail to charge client ac stock");
    })
  }

  private chargeAllUnpaidBundlePurchases() {
    this.bundleService.getAllUnpaidBundlePurchases(this.surbooking.client.idPerson).then((res) => {
      this.clientUnpaidBundlePurchases = res;
    }).catch(() => {
      console.error("Fail to get all unpaid bundle purchases");
    });
  }

  private chargeAllUnpaidACPurchases() {
    this.acService.getAllUnpaidACPurchases(this.surbooking.client.idPerson).then((res) => {
      this.clientUnpaidACPurchases = res;
    }).catch(() => {
      console.error("Fail to get all unpaid ac purchases");
    });
  }

  sellBundle() {
    let bundlePurchaseModal: BsModalRef = this.modalService.show(BundlePurchaseModalComponent, {
      class: 'big-modal'
    });
    bundlePurchaseModal.content.client = this.surbooking.client;
    bundlePurchaseModal.content.rechargeable = this;
  }

  paymentSuccessOccurred(success: boolean) {
    this.verifyClientHasPaidToday();
  }

  verifyClientHasPaidToday(): void {
    this.billService.clientMakePaymentToday(this.surbooking.client.idPerson).then((res) => {
      this.clientHasPaidToday = res;
    }).catch(() => {
      console.error("Fail to verify id client has paid today");
      this.clientHasPaidToday = false;
    });
  }

  finalize() {
    let confirmationModal: BsModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    confirmationModal.content.title = "Finalisation du client";
    confirmationModal.content.text = "Vous êtes sur le point de finiliser le client, êtes-vous sûr?";
    confirmationModal.content.confirmationFunction = () => this.finalizeSurbooking();
  }

  finalizeSurbooking(): void {
    this.surbookingService.finalize(this.surbooking.idSurbooking).then(() => {
      this.successFinalizeSurbooking();
    }).catch((err) => {
      this.failFinalizeSurbooking(err);
    });
  }

  private successFinalizeSurbooking() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Finalisation du client réussie";
    successModal.content.text = "La finalisation du client a réussie";
    this.rechargeable?.recharge();
    this.bsRef.hide();
    this.parent?.hide();
  }

  private failFinalizeSurbooking(err: SimpleResponseDTO) {
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Finalisation du client a échouée";
    failModal.content.text = "La finalisation du client n'a pas fonctionnée, Erreur : <strong>" + err.message + "</strong>";
    this.rechargeable?.recharge();
  }

}
