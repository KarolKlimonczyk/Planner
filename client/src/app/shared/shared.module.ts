import {NgModule} from '@angular/core';
import {EventService} from "./services/EventService";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/AuthService";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    EventService,
    AuthService
  ],
})
export class SharedModule {
}
