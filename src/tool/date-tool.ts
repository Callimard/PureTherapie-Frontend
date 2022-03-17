export class DateTool {

  public static toMySQLDateString(date: Date): string {
    let split: string[] = date.toLocaleDateString().split('/');
    return split[2] + '-' + split[1] + '-' + split[0];
  }

  public static extractOnlyDate(dateTime: string): string {
    return dateTime.split('T')[0];
  }

  public static extractOnlyTime(dateTime: string): string {
    return dateTime.split('T')[1].split('-')[0];
  }

  public static readableDateTime(dateTime: string): string {
    return DateTool.extractOnlyDate(dateTime) + " " + DateTool.extractOnlyTime(dateTime);
  }

  public static getDay(dayNumber: number): string {
    let day = (dayNumber % 8);
    switch (day) {
      case 1:
        return 'Lundi'
      case 2:
        return 'Mardi'
      case 3:
        return 'Mercredi'
      case 4:
        return 'Jeudi'
      case 5:
        return 'Vendredi'
      case 6:
        return 'Samedi'
      case 7:
        return 'Dimanche'
      default:
        return 'UNKNOWN_DAY_NUMBER';
    }
  }

}
