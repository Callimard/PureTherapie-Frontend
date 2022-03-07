import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DateTool} from "../../../../tool/date-tool";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {TimeSlotDTO} from "../../../../services/agenda/time-slot-dto";
import {TechnicianDTO} from "../../../../services/person/technician/dto/technician-dto";
import {TechnicianService} from "../../../../services/person/technician/technician.service";

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

  firstTime = true;
  currentDay: Date = new Date(this.day);
  firstDayWeek: Date = new Date(this.currentDay);
  lastDayWeek: Date = new Date(this.currentDay);
  allWeekDays: string[] = []

  allTs: TimeSlotDTO[] = [];

  technicians: TechnicianDTO[] = [];
  dayTechTs: Map<string, Map<number, TimeSlotDTO[]>> = new Map<string, Map<number, TimeSlotDTO[]>>();

  private agendaLineHeight: string = "7%";
  agendaGridTemplateRow: string = "repeat(18, " + this.agendaLineHeight + ")";

  constructor(private agendaService: AgendaService, private technicianService: TechnicianService) {
    // Normal
  }

  ngOnInit(): void {
    this.updateWeekDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentDay = new Date(this.day);

    let oldFirstDay = new Date(this.firstDayWeek);
    let oldLastDay = new Date(this.lastDayWeek);

    this.updateWeekDays();
    this.fillAllWeekDays();

    if (!this.isInCurrentWeek(this.currentDay, oldFirstDay, oldLastDay) || this.firstTime) {
      this.firstTime = false;
      this.updateTimeSlots().then(() => console.log("Finish to get ts time"));
    }
  }

  private isInCurrentWeek(date: Date, firstWeekDay: Date, lastWeekDay: Date): boolean {
    return firstWeekDay.getTime() <= date.getTime() && date.getTime() <= lastWeekDay.getTime();
  }

  updateWeekDays() {
    this.firstDayWeek = new Date(this.currentDay);
    let day = this.currentDay.getDay() == 0 ? 7 : this.currentDay.getDay();
    this.firstDayWeek.setDate(this.currentDay.getDate() - (day - 1));

    this.lastDayWeek = new Date(this.firstDayWeek);
    this.lastDayWeek.setDate(this.firstDayWeek.getDate() + 6);

  }

  private fillAllWeekDays() {
    this.allWeekDays = [];
    for (let i = 0; i < 7; i++) {
      let tmp: Date = new Date(this.firstDayWeek);
      tmp.setDate(tmp.getDate() + i);
      this.allWeekDays.push(this.stringDate(tmp));
    }
  }

  private async updateTimeSlots() {
    let tsDays: TimeSlotDTO[][] = [];
    await this.chargeAllDayTimeSlots(tsDays);
    await this.chargeAllDayTechTimeSlots();
    this.allTs = this.searchLongerDay(tsDays);
    this.agendaGridTemplateRow = "repeat(" + this.allTs.length + ", " + this.agendaLineHeight + ")";
  }

  private async chargeAllDayTimeSlots(tsDays: TimeSlotDTO[][]) {
    for (let weekDay of this.allWeekDays) {
      await this.agendaService.getAllTimeSlotsOfDay(weekDay)
        .then(res => {
          tsDays.push(res);
        });
    }
  }

  private async chargeAllDayTechTimeSlots() {
    await this.chargeAllTechnicians();
    for (let weekDay of this.allWeekDays) {
      this.agendaService.getAllDayTechnicianTimeSlot(weekDay).then((res) => {
        this.dayTechTs.set(weekDay, res);
      });
    }
  }

  private async chargeAllTechnicians() {
    this.technicians = await this.technicianService.getAllTechnicians();
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

  previousWeek() {
    let tmp = new Date(this.firstDayWeek);
    tmp.setDate(this.firstDayWeek.getDate() - 7);
    this.updateCurrentDay(tmp);
    this.updateWeekDays();
    this.updateTimeSlots().then(() => console.log("Finish to get ts time"));
  }

  nextWeek() {
    let tmp = new Date(this.lastDayWeek);
    tmp.setDate(this.lastDayWeek.getDate() + 1);
    this.updateCurrentDay(tmp);
    this.updateWeekDays();
    this.updateTimeSlots().then(() => console.log("Finish to get ts time"));
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

  totallyOccupied(day: string, beginTS: string): boolean {
    let dayMap: Map<number, TimeSlotDTO[]> | undefined = this.dayTechTs.get(day);

    if (dayMap) {
      let nbOccupied = 0;
      for (let tech of this.technicians) {
        let techTS: TimeSlotDTO[] | undefined = dayMap.get(tech.idPerson);
        if (techTS) {
          let foundTs = false;
          for (let ts of techTS) {
            if (ts.begin === beginTS && ts.isOccupied()) {
              nbOccupied += 1;
              foundTs = true;
            }
          }
          if (!foundTs)
            nbOccupied += 1;
        }
      }
      return nbOccupied == this.technicians.length;
    }
    return false;
  }
}
