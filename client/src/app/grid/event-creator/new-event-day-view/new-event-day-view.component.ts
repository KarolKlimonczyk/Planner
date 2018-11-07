import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {colors} from "../../day-view/colors";
import {CalendarEvent} from "angular-calendar";
import {Event} from "../../../shared/models/Event";
import {EventService} from "../../../shared/services/EventService";
import {Subject, Subscription} from "rxjs/index";

@Component({
  selector: 'pla-new-event-day-view',
  templateUrl: './new-event-day-view.component.html',
  styleUrls: ['./new-event-day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEventDayViewComponent implements OnDestroy {

  private newEventSubscription: Subscription;
  refreshCalendar: Subject<any> = new Subject();

  viewDate = new Date();

  calendarOptions = {
    format: "DD.MM.YYYY",
  };

  events: CalendarEvent[] = [
    {
      title: 'An all day event',
      color: colors.yellow,
      start: new Date(),
      allDay: true
    }
  ];

  constructor(private eventService: EventService,) {

    this.newEventSubscription = this.eventService.newEvent$.subscribe(
      (event: Event) => {
        const calendarEvent = {
          title: event.title,
          color: {primary: event.color, secondary: event.color},
          start: event.start,
          end: event.end,
          allDay: event.allDay,
          draggable: event.draggable
        };

        this.events.push(calendarEvent);
        this.refreshCalendar.next();
      }
    )
  }

  ngOnDestroy(): void {
    this.newEventSubscription.unsubscribe();
  }

  updateViewDate(date: string) {
    //for creating new date from string, we need 'yyyy-MM-dd' format
    //so let's split 'dd.MM.yyyy' format by comma, reverse and then join
    this.viewDate = new Date(date.split('.').reverse().join('-'));
    this.refreshCalendar.next();
  }
}
