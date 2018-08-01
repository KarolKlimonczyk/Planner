import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../models/Event";

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

  constructor(private http: HttpClient) {
  }

  public notifyAboutNewEvent(event: Event) {
    this.newEvent.next(event);
  }

  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(EVENT_API + id);
  }

  public addNewEvent(event: Event): Observable<any> {
    return this.http.post(EVENT_API + "add", event, httpOptions);
  }
}
