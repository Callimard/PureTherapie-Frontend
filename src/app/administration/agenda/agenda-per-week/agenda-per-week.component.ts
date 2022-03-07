import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DateTool} from "../../../../tool/date-tool";

@Component({
  selector: 'app-agenda-per-week',
  templateUrl: './agenda-per-week.component.html',
  styleUrls: ['./agenda-per-week.component.css'],
  host: {'class': 'b'}
})
export class AgendaPerWeekComponent implements OnInit, OnChanges {

  @Input() day: string = DateTool.toMySQLDateString(new Date());

  currentDay: Date = new Date(this.day);
  firstDayWeek: Date = new Date(this.currentDay);
  lastDayWeek: Date = new Date(this.currentDay);

  allWeekDays: string[] = []

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    this.updateDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateDate();
  }

  updateDate() {
    this.currentDay = new Date(this.day);
    console.log('current day', this.stringDate(this.currentDay));
    console.log("Current day day", this.currentDay.getDay());

    this.firstDayWeek = new Date(this.currentDay);
    let day = this.currentDay.getDay() == 0 ? 7 : this.currentDay.getDay();
    this.firstDayWeek.setDate(this.currentDay.getDate() - (day - 1));
    console.log('first day', this.stringDate(this.firstDayWeek));

    this.lastDayWeek = new Date(this.firstDayWeek);
    this.lastDayWeek.setDate(this.firstDayWeek.getDate() + 6);
    console.log('last day', this.stringDate(this.lastDayWeek));

    this.fillAllWeekDays();
  }

  private fillAllWeekDays() {
    this.allWeekDays = [];
    for (let i = 0; i < 7; i++) {
      let tmp: Date = new Date(this.firstDayWeek);
      tmp.setDate(tmp.getDate() + i);
      this.allWeekDays.push(this.stringDate(tmp));
    }
  }

  stringDate(date?: Date): string {
    if (date)
      return DateTool.toMySQLDateString(date);
    else
      return '';
  }

}
