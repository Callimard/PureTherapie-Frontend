import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {BillService} from "../../../../../services/product/bill/bill.service";
import {BillDTO} from "../../../../../services/product/bill/bill-dto";
import {
  SimpleConfirmationModalComponent
} from "../../../../util/modal/simple-confirmation-modal/simple-confirmation-modal.component";
import {MeansOfPaymentDTO} from "../../../../../services/product/bill/means-of-payment-dto";
import {SuccessModalComponent} from "../../../../util/modal/success-modal/success-modal.component";
import {FailModalComponent} from "../../../../util/modal/fail-modal/fail-modal.component";
import {DateTool} from "../../../../../tool/date-tool";
import {PaymentDTO} from "../../../../../services/product/bill/payment-dto";
import {BillTool} from "../../../../../tool/bill-tool";

export interface PaymentObserver {
  paymentSuccess(): void;
}

@Component({
  selector: 'app-client-payment-modal',
  templateUrl: './client-payment-modal.component.html',
  styleUrls: ['./client-payment-modal.component.css']
})
export class ClientPaymentModalComponent implements OnInit {

  allMeansOfPayment: MeansOfPaymentDTO[] = [];

  bill: BillDTO = BillDTO.default();

  selectMeansOfPayment: MeansOfPaymentDTO = MeansOfPaymentDTO.default();

  confirmationModalRef?: BsModalRef;

  rechargeable?: { recharge(): () => void };
  paymentObserver?: PaymentObserver;

  constructor(private billService: BillService, public bsModalRef: BsModalRef, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.chargeAllMeansOfPayments();
  }

  recharge() {
    this.chargeAllMeansOfPayments();
    this.rechargeBill();
  }

  private chargeAllMeansOfPayments() {
    this.billService.getAllMeansOfPayments().then((res) => {
      this.allMeansOfPayment = res;
      this.selectMeansOfPayment = this.allMeansOfPayment[0];
    }).catch((err) => {
      console.error("Fail to charge all means of payments, Err = ", err);
    });
  }

  private rechargeBill() {
    this.billService.getBill(this.bill.idBill).then((res) => {
      this.bill = res;
    }).catch(() => {
      console.error("Fail to recharge and update bill");
    })
  }

  close() {
    this.bsModalRef.hide();
  }

  amountPaid(bill: BillDTO): number {
    return BillTool.amountPaid(bill);
  }

  remainingBalance(bill: BillDTO): number {
    return BillTool.remainingBalance(bill);
  }

  isTotallyPaid(bill: BillDTO): boolean {
    return BillTool.totallyPaid(bill);
  }

  pay(amountToPaid: number) {
    this.confirmationModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    this.confirmationModalRef.content.title = "Confirmation de paiement";
    this.confirmationModalRef.content.text = "Êtes-vous sur de vouloir faire payer " + amountToPaid + " €?";
    this.confirmationModalRef.content.confirmationFunction = () => this.payConfirmed();
  }

  computedAmountToPaid(): number {
    if (!MeansOfPaymentDTO.isGrouponPayment(this.selectMeansOfPayment)) {
      let remainingBalance = BillTool.remainingBalance(this.bill);
      if (remainingBalance >= 130.0) {
        return 130.0;
      } else {
        return remainingBalance;
      }
    } else {
      return 0.0;
    }
  }

  payConfirmed() {
    this.billService.payBill(this.bill.idBill, this.computedAmountToPaid(), this.selectMeansOfPayment.idMeansOfPayment).then(() => {
      this.paymentSuccess();
    }).catch((err) => {
        this.paymentFail(err);
      }
    );
  }

  private paymentSuccess() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Paiement réussie";
    successModal.content.text = "Le paiment a réussie!";
    successModal.content.parent = this.confirmationModalRef;
    this.recharge();
    this.rechargeable?.recharge();
    this.paymentObserver?.paymentSuccess();
  }

  private paymentFail(err: any) {
    console.error("Fail to pay, Err = ", err);
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Paiement échoué";
    failModal.content.text = "Le paiment n'a pas réussie";
    failModal.content.parent = this.confirmationModalRef;
    this.rechargeable?.recharge();
  }

  cancelPayment(payment: PaymentDTO) {
    this.confirmationModalRef = this.modalService.show(SimpleConfirmationModalComponent);
    this.confirmationModalRef.content.title = "Confirmation d'annulation de paiement";
    this.confirmationModalRef.content.text = "Êtes-vous sur de vouloir annuler le payser du "
      + this.extractOnlyDay(payment.paymentDate) + " et d'un montant de " + payment.amountPaid + " €?";
    this.confirmationModalRef.content.confirmationFunction = () => this.cancelConfirm(payment);
  }

  private cancelConfirm(payment: PaymentDTO) {
    this.billService.cancelPayment(payment.idPayment).then(() => {
      this.cancelPaymentSuccess();
      this.rechargeable?.recharge();
    }).catch((err) => {
      this.cancelPaymentFail(err);
      this.rechargeable?.recharge();
    })
  }

  private cancelPaymentSuccess() {
    let successModal: BsModalRef = this.modalService.show(SuccessModalComponent);
    successModal.content.title = "Annulation de paiement réussie";
    successModal.content.text = "L'annulation du paiement a réussie!";
    successModal.content.parent = this.confirmationModalRef;
    this.recharge();
    this.rechargeable?.recharge();
  }

  private cancelPaymentFail(err: any) {
    console.error("Fail to pay, Err = ", err);
    let failModal: BsModalRef = this.modalService.show(FailModalComponent);
    failModal.content.title = "Annulation de paiement échoué";
    failModal.content.text = "L'annulation du paiement n'a pas réussie";
    failModal.content.parent = this.confirmationModalRef;
    this.rechargeable?.recharge();
  }

  extractOnlyDay(dateTime: string): string {
    return DateTool.extractOnlyDate(dateTime);
  }
}
