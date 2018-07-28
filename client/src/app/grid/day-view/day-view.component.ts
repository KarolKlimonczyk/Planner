import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {colors} from "./colors";

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayViewComponent implements OnInit {

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

  constructor() {

  }

  ngOnInit() {
  }

}
