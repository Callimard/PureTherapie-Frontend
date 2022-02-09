import {PersonDTO} from "../services/person/person-dto";

export class PersonTool {

  /**
   * Format client first and last name. For example return : Guillaume RAKOTOMALALA
   *
   * @param person the client
   */
  public static formatPersonSimpleIdentifier(person: PersonDTO): string {
    return person.firstName[0].toUpperCase() + person.firstName.slice(1) + ' ' + person.lastName.toUpperCase();
  }

}
