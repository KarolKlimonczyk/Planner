import {User} from "./user";

export class Event {
  id: Number;
  title: string;
  start: Date;
  end: Date;
  users: Array<User>;
  color: string;
  allDay: boolean;
  draggable: boolean;


  constructor(title: string, start: Date, end: Date, users: Array<User>, color: string, allDay: boolean, draggable: boolean) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.users = users;
    this.color = color;
    this.allDay = allDay;
    this.draggable = draggable;
  }
}
