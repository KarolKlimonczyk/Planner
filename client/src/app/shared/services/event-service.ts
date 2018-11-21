import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../models/event";
import {CalendarEvent} from "angular-calendar";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const EVENT_API = "/api/event/";

@Injectable()
export class EventService {

  private newEvent = new Subject<Event>();
  newEvent$ = this.newEvent.asObservable();

  private dayViewChange = new Subject<Date>();
  dayViewChange$ = this.dayViewChange.asObservable();

  constructor(private http: HttpClient) {
  }

  public notifyAboutNewEvent(event: Event) {
    this.newEvent.next(event);
  }

  public notifyAboutDayViewChanges(date: Date) {
    this.dayViewChange.next(date);
  }

  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(EVENT_API + id);
  }

  public addNewEvent(event: Event): Observable<any> {
    return this.http.post(EVENT_API + "add", event, httpOptions);
  }

  public mapEventToCalendarEvent(event: Event): CalendarEvent {
    return {
      title: event.title,
      color: {primary: event.color, secondary: event.color},
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: event.allDay,
      draggable: event.draggable
    };
  }
}