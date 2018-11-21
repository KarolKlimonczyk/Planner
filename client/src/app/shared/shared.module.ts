import {NgModule} from '@angular/core';
import {EventService} from "./services/event-service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth-service";
import {AuthGuard} from "./config/auth-guard";
import {DateFormatPipe} from "./pipes/date-format-pipe";


@NgModule({
  declarations: [
    DateFormatPipe
  ],
  exports: [
    DateFormatPipe
  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    EventService,
    AuthService,
    AuthGuard
  ],
})
export class SharedModule {
}
