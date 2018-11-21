import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../shared/services/event-service";
import {Event} from "../../../shared/models/event";
import {AuthService} from "../../../shared/services/auth-service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'pla-new-event-inputs',
  templateUrl: './new-event-inputs.component.html',
  styleUrls: ['./new-event-inputs.component.scss']
})
export class NewEventInputsComponent implements OnDestroy {

  private newEventForm: FormGroup;
  private color = "#2889e9";
  private options = {
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

    this.eventService.dayViewChange$.subscribe(
      date => {
        this.newEventForm.controls['startDate'].setValue(date);
        let endDate = date;
        endDate.setHours(date.getHours() + 1);
        this.newEventForm.controls['endDate'].setValue(endDate);
      }
    )
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
