import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DateTool} from "../../../../tool/date-tool";

@Component({
  selector: 'app-agenda-choose-date',
  templateUrl: './agenda-choose-date.component.html',
  styleUrls: ['./agenda-choose-date.component.css'],
  host: {'class': 'agenda-choose-date'}
})
export class AgendaChooseDateComponent implements OnInit, OnChanges {

  private chosenDayDate: Date = new Date();
  @Input() chosenDay: string = DateTool.toMySQLDateString(this.chosenDayDate);
  @Input() defaultChosenDay?: string;
  @Output() dayChangeEvent = new EventEmitter<string>();

  constructor() {
    // Normal
  }

  ngOnInit(): void {
    // Normal
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chosenDayDate = new Date(this.chosenDay);
  }

  changeDate(dateAdd: number): void {
    this.chosenDayDate.setDate(this.chosenDayDate.getDate() + dateAdd);
    this.updateChosenDay();
  }

  returnToDefaultDate() {
    if (this.defaultChosenDay == null) {
      this.chosenDayDate = new Date();
    } else {
      this.chosenDayDate = new Date(this.defaultChosenDay);
    }
    this.updateChosenDay();
  }

  private updateChosenDay() {
    this.chosenDay = DateTool.toMySQLDateString(this.chosenDayDate);
    this.dayChangeEvent.emit(this.chosenDay);
  }

}
