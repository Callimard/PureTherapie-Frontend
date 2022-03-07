import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DateTool} from "../../../../tool/date-tool";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";

// noinspection JSMethodCanBeStatic
@Component({
  selector: 'app-agenda-per-week',
  templateUrl: './agenda-per-week.component.html',
  styleUrls: ['./agenda-per-week.component.css'],
  host: {'class': 'b'}
})
export class AgendaPerWeekComponent implements OnInit, OnChanges {

  @Input() day: string = DateTool.toMySQLDateString(new Date());
  @Output() dayChange = new EventEmitter<string>();

  currentDay: Date = new Date(this.day);
  firstDayWeek: Date = new Date(this.currentDay);
  lastDayWeek: Date = new Date(this.currentDay);
  allWeekDays: string[] = []

  allTs: TimeSlotDTO[] = [];

  private agendaLineHeight: string = "7%";
  agendaGridTemplateRow: string = "repeat(18, " + this.agendaLineHeight + ")";

  constructor(private agendaService: AgendaService) {
    // Normal
  }

  ngOnInit(): void {
    this.updateAllWeekDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentDay = new Date(this.day);
    this.updateAllWeekDays();
  }

  updateAllWeekDays() {
    this.firstDayWeek = new Date(this.currentDay);
    let day = this.currentDay.getDay() == 0 ? 7 : this.currentDay.getDay();
    this.firstDayWeek.setDate(this.currentDay.getDate() - (day - 1));

    this.lastDayWeek = new Date(this.firstDayWeek);
    this.lastDayWeek.setDate(this.firstDayWeek.getDate() + 6);

    this.fillAllWeekDays();
  }

  private fillAllWeekDays() {
    this.allWeekDays = [];
    for (let i = 0; i < 7; i++) {
      let tmp: Date = new Date(this.firstDayWeek);
      tmp.setDate(tmp.getDate() + i);
      this.allWeekDays.push(this.stringDate(tmp));
    }

    this.updateTimeSlots().then(() => console.log("Finish to get ts time"));
  }

  private async updateTimeSlots() {
    let tsDays: TimeSlotDTO[][] = [];
    await this.chargeAllDayTimeSlots(tsDays);
    this.allTs = this.searchLongerDay(tsDays);
    this.agendaGridTemplateRow = "repeat(" + this.allTs.length + ", " + this.agendaLineHeight + ")";
  }

  private searchLongerDay(tsDays: TimeSlotDTO[][]) {
    let longerTsDays: TimeSlotDTO[] = [];
    for (let tsDay of tsDays) {
      if (tsDay.length > longerTsDays.length) {
        longerTsDays = tsDay;
      }
    }
    return longerTsDays;
  }

  private async chargeAllDayTimeSlots(tsDays: TimeSlotDTO[][]) {
    for (let weekDay of this.allWeekDays) {
      await this.agendaService.getAllTimeSlotsOfDay(weekDay)
        .then(res => {
          tsDays.push(res);
        });
    }
  }

  previousWeek() {
    let tmp = new Date(this.firstDayWeek);
    tmp.setDate(this.firstDayWeek.getDate() - 7);
    this.updateCurrentDay(tmp);
    this.updateAllWeekDays();
  }

  nextWeek() {
    let tmp = new Date(this.lastDayWeek);
    tmp.setDate(this.lastDayWeek.getDate() + 1);
    this.updateCurrentDay(tmp);
    this.updateAllWeekDays();

  }

  selectDay(day: string) {
    this.day = day;
    this.currentDay = new Date(this.day);
    this.dayChange.emit(this.day);
  }

  private updateCurrentDay(date: Date) {
    this.currentDay = new Date(date);
    this.day = DateTool.toMySQLDateString(this.currentDay);
    this.dayChange.emit(this.day);
  }

  stringDate(date?: Date): string {
    if (date)
      return DateTool.toMySQLDateString(date);
    else
      return '';
  }
}
