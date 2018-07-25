import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {DayViewComponent} from './grid/day-view/day-view.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from '@angular/router';
import {ScheduleGridComponent} from './grid/schedule-grid/schedule-grid.component';

const routes: Routes = [
  {path: '', component: DayViewComponent},
  {path: "schedule", component: ScheduleGridComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DayViewComponent,
    ScheduleGridComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
