import {NgModule} from '@angular/core';
import {EventService} from "./services/EventService";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/AuthService";
import {AuthGuard} from "./config/AuthGuard";


@NgModule({
  declarations: [],
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
