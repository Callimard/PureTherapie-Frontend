import {ClientDTO} from "../client-dto";

export class ClientRegistrationFailDTO {
  constructor(public firstName: string, public lastName: string, public email: string, public phone: string,
              public photo: string, public comment: string, public technicalComment: string,
              public constraintViolation: string, public dataIntegrity: string, public doubloons: ClientDTO[]) {
  }

  public static extractAllErrors(clientRegistrationFail: ClientRegistrationFailDTO): string {
    let error: string = "<ul>";

    error += clientRegistrationFail.firstName != null ? "<li><strong>Prénom mal formatée</strong></li>" : '';
    error += clientRegistrationFail.lastName != null ? "<li><strong>Nom de famille mal formatée</strong></li>" : '';
    error += clientRegistrationFail.email != null ? "<li><strong>Email mal formatée</strong></li>" : '';
    error += clientRegistrationFail.phone != null ? "<li><strong>Téléphone mal formatée</strong></li>" : '';
    error += clientRegistrationFail.photo != null ? "<li><strong>" + clientRegistrationFail.photo + "</strong></li>" : '';
    error += clientRegistrationFail.comment != null ? "<li><strong>" + clientRegistrationFail.comment + "</strong></li>" : '';
    error += clientRegistrationFail.technicalComment != null ? "<li><strong>" + clientRegistrationFail.technicalComment + "</strong></li>" : '';
    error += clientRegistrationFail.constraintViolation != null ?
      "<li><strong>" + ClientRegistrationFailDTO.formatConstraintViolationError(clientRegistrationFail.constraintViolation) + "</strong></li>" : '';
    error += clientRegistrationFail.dataIntegrity != null ? "<li><strong>" + clientRegistrationFail.dataIntegrity + "</strong></li>" : '';
    error += clientRegistrationFail.doubloons != null ? "<li><strong>Doublon de client</strong></li>" : '';

    error += "</ul>"

    return error;
  }

  private static formatConstraintViolationError(constraintError: string): string {
    if (constraintError.includes("email")) {
      return "Email client déjà existant";
    } else if (constraintError.includes("phone")) {
      return "Téléphone client déjà existant";
    } else {
      return constraintError;
    }
  }
}
