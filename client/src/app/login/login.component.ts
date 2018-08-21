import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService as SocialAuthService, FacebookLoginProvider} from "angularx-social-login";
import {AuthService} from "../shared/services/AuthService";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'pla-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscriber: Subscription;
  private loggedUserSubscriber: Subscription;

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.loginSubscriber = this.authService.sendAuthToken(user.authToken).subscribe();
      }
    );
  }

  getLoggedUser() {
    this.loggedUserSubscriber = this.authService.getLoggedUser().subscribe(
      user => console.log(user)
    );
  }

  ngOnDestroy(): void {
    this.loggedUserSubscriber.unsubscribe();
    this.loginSubscriber.unsubscribe();
  }
}
