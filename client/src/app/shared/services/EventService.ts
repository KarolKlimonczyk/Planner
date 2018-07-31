import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {Event} from "../models/Event";

@Injectable()
export class EventService {

  private newEvent = new Subject<Event>();
  newEvent$ = this.newEvent.asObservable();

  constructor(private http: HttpClient) {
  }

  public notifyAboutNewEvent(event: Event) {
    this.newEvent.next(event);
  }

  public getEventById(id: number): Observable<any> {
    return this.http.get("/api/event/1");
  }
}
