export class PhoneTool {

  /**
   * Remove the first 0 in front of the phone to be compatible with the DB phone format
   *
   * @param phone
   */
  public static formatPhone(phone: string): string {
    return phone.slice(1);
  }

}
