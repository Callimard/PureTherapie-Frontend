import {ClientDTO} from "../../person/client/client-dto";
import {PaymentTypeDTO} from "./payment-type-dto";
import {PaymentDTO} from "./payment-dto";

export class BillDTO {

  constructor(public idBill: number,
              public basePrice: number,
              public purchasePrice: number,
              public creationDate: string,
              public client: ClientDTO,
              public paymentType: PaymentTypeDTO,
              public payments: PaymentDTO[]) {
  }

  public static default(): BillDTO {
    let billDTO = new BillDTO(-1, -1, -1, "DEFAULT_BILL", ClientDTO.default(), PaymentTypeDTO.default(), []);
    billDTO.payments = [PaymentDTO.default(billDTO)];
    return billDTO;
  }

}
