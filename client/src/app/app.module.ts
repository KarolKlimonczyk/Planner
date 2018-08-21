import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {DayViewComponent} from './grid/day-view/day-view.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule, Routes} from '@angular/router';
import {ScheduleGridComponent} from './grid/schedule-grid/schedule-grid.component';
import {CalendarModule} from "angular-calendar";
import {GridModule} from "./grid/grid.module";
import {EventCreatorComponent} from "./grid/event-creator/event-creator.component";
import {SharedModule} from "./shared/shared.module";
import {LoginComponent} from './login/login.component';
import {AuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {getAuthServiceConfigs} from "./shared/config/SocialAuthConfig";

const routes: Routes = [
  {path: '', component: DayViewComponent},
  {path: "schedule", component: ScheduleGridComponent},
  {path: "new-event", component: EventCreatorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    CalendarModule.forRoot(),
    SocialLoginModule,

    //planner modules
    GridModule,
    SharedModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
