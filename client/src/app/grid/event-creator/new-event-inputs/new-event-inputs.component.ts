import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../shared/services/EventService";
import {Event} from "../../../shared/models/Event";
import {AuthService} from "../../../shared/services/AuthService";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'pla-new-event-inputs',
  templateUrl: './new-event-inputs.component.html',
  styleUrls: ['./new-event-inputs.component.scss']
})
export class NewEventInputsComponent implements OnDestroy {

  newEventForm: FormGroup;
  color = "#2889e9";
  options = {
    format: "DD.MM.YYYY hh:mm",
  };

  private eventSubscription: Subscription;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    const startDate = new Date();
    let endDate = new Date();
    endDate.setHours(endDate.getHours() + 1);

    this.newEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: [startDate, Validators.required],
      endDate: [endDate, Validators.required],
      allDayEvent: [false],
      draggable: [false]
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  createNewEvent() {
    let event = new Event(
      this.newEventForm.value.title,
      this.newEventForm.value.startDate,
      this.newEventForm.value.endDate,
      [this.authService.getLoggedUser()],
      this.color,
      this.newEventForm.value.allDayEvent,
      this.newEventForm.value.draggable
    );

    this.eventSubscription = this.eventService.addNewEvent(event).subscribe(
      () => {
        this.eventService.notifyAboutNewEvent(event);
      },
      error => {
        console.error("Cannot create new event", error);
      }
    )
  }
}
