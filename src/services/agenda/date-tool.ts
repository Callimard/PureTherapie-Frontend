export class DateTool {

  public static toMySQLDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  public static extractOnlyDay(dateTime: string): string {
    return dateTime.split('T')[0];
  }

}
