import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";

const USER_API = "/api/user/";

@Injectable()
export class AuthService {

  private loggedUser: User;

  constructor(private http: HttpClient, private router: Router) {
  }

  public getLoggedUserFromServer(): Observable<User> {
    return this.http.get<User>(USER_API + "logged");
  }

  public sendAuthToken(authToken) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'oauth_token': authToken
    });
    let options = {headers: headers};

    return this.http.post("/api/login/facebook", null, options).subscribe(
      () => {
        this.getLoggedUserFromServer().subscribe(
          user => {
            this.saveUserAndRedirectToHome(user);
          },
          error => {
            console.error("Cannot obtain logged user!", error)
          }
        )
      },
      error => {
        console.error("Cannot sign in!", error);
      }
    );
  }

  public getLoggedUser(): User {
    return this.loggedUser;
  }

  public isAuthenticated() {
    return !!this.loggedUser;
  }

  public saveUserAndRedirectToHome(user: User) {
    this.loggedUser = user;
    sessionStorage.setItem("userName", user.name);
    this.router.navigate(['/schedule']);
  }
}
