import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder) {
    const currentDate = new Date();

    this.newEventForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: [currentDate, Validators.required],
      endDate: [currentDate, Validators.required]
    })
  }

  ngOnInit() {
  }

}
