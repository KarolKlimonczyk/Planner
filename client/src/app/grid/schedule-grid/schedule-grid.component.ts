import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CalendarEvent} from "angular-calendar";
import {EventService} from "../../shared/services/event-service";

@Component({
  selector: 'app-schedule-grid',
  templateUrl: './schedule-grid.component.html',
  styleUrls: ['./schedule-grid.component.scss']
})
export class ScheduleGridComponent implements OnInit {

  view: string = 'month';
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ film: any }>>>;

  activeDayIsOpen: boolean = false;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.events$ = this.eventService.getUserEvents();
  }
}
