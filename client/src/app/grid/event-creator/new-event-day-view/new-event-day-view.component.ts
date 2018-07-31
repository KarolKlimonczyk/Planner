import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
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
export class NewEventDayViewComponent implements OnInit, OnDestroy {

  private newEventSubscription: Subscription;
  refreshCalendar: Subject<any> = new Subject();

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An all day event',
      color: colors.yellow,
      start: new Date(),
      allDay: true
    },
    // {
    //   title: 'A non all day event',
    //   color: colors.blue,
    //   start: new Date(),
    //   draggable: true
    // }
  ];

  constructor(private eventService: EventService,) {

    this.newEventSubscription = this.eventService.newEvent$.subscribe(
      (event: Event) => {
        const calendarEvent = {
          title: event.title,
          color: colors.red,
          start: event.start,
          end: event.end
        };

        this.events.push(calendarEvent);
        this.refreshCalendar.next();
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.newEventSubscription.unsubscribe();
  }
}
