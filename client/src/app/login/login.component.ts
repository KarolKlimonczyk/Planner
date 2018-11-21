import {Component, OnDestroy} from '@angular/core';
import {AuthService as SocialAuthService, FacebookLoginProvider} from "angularx-social-login";
import {AuthService} from "../shared/services/auth-service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'pla-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private loginSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService) {
  }

  signIn() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (user) => {
        this.loginSubscription = this.authService.sendAuthToken(user.authToken);
      }
    );
  }

  getLoggedUser() {
    return this.authService.getLoggedUser();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
