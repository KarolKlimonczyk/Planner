import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Event} from "../../../shared/models/event";
import {EventService} from "../../../shared/services/event-service";
import {Subject, Subscription} from "rxjs/index";
import {AuthService} from "../../../shared/services/auth-service";

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

  events = [];

  constructor(private eventService: EventService, private authService: AuthService) {

    this.newEventSubscription = this.eventService.newEvent$.subscribe(
      (event: Event) => {
        const calendarEvent = this.eventService.mapEventToCalendarEvent(event);
        this.events.push(calendarEvent);
        this.refreshCalendar.next();
      }
    );

    this.authService.getLoggedUser().events.forEach((event) => {
      this.events.push(this.eventService.mapEventToCalendarEvent(event));
    });

  }

  ngOnDestroy(): void {
    this.newEventSubscription.unsubscribe();
  }

  updateViewDate(date: string) {
    //for creating new date from string, we need 'yyyy-MM-dd' format
    //so let's split 'dd.MM.yyyy' format by comma, reverse and then join
    this.viewDate = new Date(date.split('.').reverse().join('-'));
    this.refreshCalendar.next();
    this.eventService.notifyAboutDayViewChanges(this.viewDate);
  }

  changeDay(daysToAdd) {
    let tempDate = new Date();
    tempDate.setDate(this.viewDate.getDate() + daysToAdd);

    //reassign date due to update input value
    this.viewDate = tempDate;
    this.refreshCalendar.next();
    this.eventService.notifyAboutDayViewChanges(this.viewDate);
  }
}
