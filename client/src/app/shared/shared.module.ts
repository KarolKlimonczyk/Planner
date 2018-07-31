import {NgModule} from '@angular/core';
import {EventService} from "./services/EventService";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    EventService
  ],
})
export class SharedModule {
}
