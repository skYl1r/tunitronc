import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private host = environment.host;

  public jwt;
  private username: string;
  private roles: Array<string>;


  constructor(private http: HttpClient) {}



  login(data): Observable<any> {
    return this.http.post<any>(this.host + '/login', data, { observe: 'response' });
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT();
  }

  parseJWT() {
    const jwtHelper = new JwtHelperService();
    if (this.jwt) {
      const objJWT = jwtHelper.decodeToken(this.jwt);
      this.username = objJWT.sub;
      this.roles = objJWT.roles;
    }
  }



  getUsername() {
    return this.username;
  }
  isSuperAdmin() {
    return this.roles.indexOf('SuperAdmin') >= 0;
  }
  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('ABONNE') >= 0;
  }

  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }


  logout() {
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
