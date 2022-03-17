import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DateTool} from "../../../../tool/date-tool";
import {AgendaService} from "../../../../services/agenda/agenda.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";
import {
  EditExceptionalOpeningModalComponent
} from "../../opening-time/edit-exceptional-opening-modal/edit-exceptional-opening-modal.component";
import {
  ExceptionalCloseModalComponent
} from "../../opening-time/exceptional-close-modal/exceptional-close-modal.component";
import {Rechargeable} from "../../../../tool/rechargeable";

@Component({
  selector: 'app-agenda-per-month',
  templateUrl: './agenda-per-month.component.html',
  styleUrls: ['./agenda-per-month.component.css'],
  host: {'class': 'agenda-per-month'}
})
export class AgendaPerMonthComponent implements OnInit, OnChanges, Rechargeable {

  @Input() currentDayString: string = DateTool.toMySQLDateString(new Date());
  @Output() dayChange = new EventEmitter<string>();

  currentDay: Date = new Date(this.currentDayString);
  firstDayMonth: Date = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), 1);
  lastDayMonth: Date = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth() + 1, 0);
  mapMonthDay: Map<number, string[]> = new Map<number, string[]>();
  mapDayOpen: Map<string, boolean> = new Map<string, boolean>();

  constructor(private agendaService: AgendaService, private modalService: BsModalService) {
    // Normal
  }

  ngOnInit(): void {
    this.updateCurrentDay(this.currentDay);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCurrentDay(new Date(this.currentDayString));
  }

  recharge(): void {
    this.fillMapMonth();
  }

  selectDay(day: string) {
    this.currentDayString = day;
    this.updateCurrentDay(new Date(this.currentDayString));
  }

  previousMonth() {
    let tmp: Date = new Date(this.firstDayMonth);
    tmp.setDate(tmp.getDate() - 1);
    this.updateCurrentDay(tmp);
  }

  nextMonth() {
    let tmp: Date = new Date(this.lastDayMonth);
    tmp.setDate(tmp.getDate() + 1);
    this.updateCurrentDay(tmp);
  }

  updateCurrentDay(date: Date) {
    this.currentDay = new Date(date);
    this.firstDayMonth = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth(), 1);
    this.lastDayMonth = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth() + 1, 0);

    this.currentDayString = DateTool.toMySQLDateString(this.currentDay);
    this.dayChange.emit(this.currentDayString);

    this.fillMapMonth();
  }

  private fillMapMonth() {
    let tmp: Date = new Date(this.firstDayMonth);
    tmp.setDate(tmp.getDate() - tmp.getDay());
    this.mapMonthDay = new Map<number, string[]>();
    while (tmp.getTime() <= this.lastDayMonth.getTime()) {
      let month: string[] | undefined = this.mapMonthDay.get(tmp.getDay());
      if (!month) {
        month = [];
        this.mapMonthDay.set(tmp.getDay(), month);

      }
      month.push(DateTool.toMySQLDateString(tmp));
      this.chargeIsOpen(DateTool.toMySQLDateString(tmp));
      tmp.setDate(tmp.getDate() + 1);
    }
  }

  private chargeIsOpen(day: string) {
    this.agendaService.isOpenDay(day).subscribe({
      next: (res) => this.mapDayOpen.set(day, res),
      error: (err: HttpErrorResponse) => console.error("Fail charge isOpen, Err = ", err.error)
    })
  }

  isOpen(day: string) {
    return this.mapDayOpen.get(day);
  }

  isInCurrentMonth(date: string) {
    let tmp: Date = new Date(date);
    return tmp.getMonth() == this?.currentDay.getMonth();
  }

  clickOn(day: string) {
    if (!this.isOpen(day)) {
      this.modalService.show(EditExceptionalOpeningModalComponent, {
        initialState: {
          paramDay: day,
          rechargeable: this
        }
      })
    } else {
      this.modalService.show(ExceptionalCloseModalComponent, {
        initialState: {
          selectedDay: day,
          rechargeable: this
        }
      });
    }
  }

  clickDayHeader(day: string) {
    this.updateCurrentDay(new Date(day));
  }
}
