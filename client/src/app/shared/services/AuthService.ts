import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const USER_API = "/api/user/";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getLoggedUser(): Observable<any> {
    return this.http.get<any>(USER_API + "logged");
  }

  public sendAuthToken(authToken) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'oauth_token': authToken
    });
    let options = {headers: headers};
    return this.http.post("/api/login/facebook", null, options);
  }
}
