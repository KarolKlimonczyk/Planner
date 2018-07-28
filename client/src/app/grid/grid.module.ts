import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DayViewComponent} from "./day-view/day-view.component";
import {ScheduleGridComponent} from "./schedule-grid/schedule-grid.component";
import {EventCreatorComponent} from "./event-creator/event-creator.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {CalendarModule} from "angular-calendar";
import { NewEventInputsComponent } from './event-creator/new-event-inputs/new-event-inputs.component';
import { NewEventDayViewComponent } from './event-creator/new-event-day-view/new-event-day-view.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgTempusdominusBootstrapModule} from "ngx-tempusdominus-bootstrap";


@NgModule({
  declarations: [
    DayViewComponent,
    ScheduleGridComponent,
    EventCreatorComponent,
    NewEventInputsComponent,
    NewEventDayViewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgTempusdominusBootstrapModule
  ],
  providers: [],
})
export class GridModule {
}
