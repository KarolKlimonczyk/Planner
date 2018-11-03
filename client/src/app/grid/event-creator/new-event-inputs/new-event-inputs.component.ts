import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../shared/services/EventService";
import {Event} from "../../../shared/models/Event";
import {AuthService} from "../../../shared/services/AuthService";

@Component({
  selector: 'pla-new-event-inputs',
  templateUrl: './new-event-inputs.component.html',
  styleUrls: ['./new-event-inputs.component.scss']
})
export class NewEventInputsComponent implements OnInit {

  newEventForm: FormGroup;

  options = {
    format: "DD.MM.YYYY hh:mm",
  };

  constructor(private eventService: EventService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    const currentDate = new Date();

    this.newEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: [currentDate, Validators.required],
      endDate: [currentDate, Validators.required]
    })
  }

  ngOnInit() {
  }

  createNewEvent() {
    let event = new Event();
    event.title = this.newEventForm.value.title;
    event.start = this.newEventForm.value.startDate;
    event.end = this.newEventForm.value.endDate;
    event.users = [this.authService.getLoggedUser()];

    this.eventService.addNewEvent(event).subscribe(
      () => {
        this.eventService.notifyAboutNewEvent(event);
      },
      error => {
        console.error(error);
      }
    )
  }
}
