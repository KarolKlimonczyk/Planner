import { Component, OnInit } from '@angular/core';
import {colors} from "../../day-view/colors";
import {CalendarEvent} from "angular-calendar";

@Component({
  selector: 'pla-new-event-day-view',
  templateUrl: './new-event-day-view.component.html',
  styleUrls: ['./new-event-day-view.component.scss']
})
export class NewEventDayViewComponent implements OnInit {

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An all day event',
      color: colors.yellow,
      start: new Date(),
      allDay: true
    },
    {
      title: 'A non all day event',
      color: colors.blue,
      start: new Date(),
      draggable: true
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
