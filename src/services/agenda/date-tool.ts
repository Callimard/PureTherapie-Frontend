export class DateTool {

  public static toMySQLDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}
