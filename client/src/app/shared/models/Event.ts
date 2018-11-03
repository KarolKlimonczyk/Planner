import {User} from "./User";

export class Event {
  id: Number;
  title: string;
  start: Date;
  end: Date;
  users: Array<User>;
  color: EventColor;
  allDay: boolean;
  draggable: boolean;
}
