import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.host;


  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }


  // <---------- Methodes for User ---------------->


  register(user): Observable < any > {
    return this.http.post(this.host + '/inscription', user);
  }


  getCurrentUser(): Observable < any > {
    const username = this.authService.getUsername();
    const url = this.host +  '/utilisateurs/search/findUtilisateurByUsername?username=' + username  ;
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});

    return  this.http.get(url, {headers: headers});
  }

  getAllUsers(): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/utilisateurs', { headers: headers});
  }

  getUserByUsername(username): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/utilisateurs/search/findUtilisateurByUsername?username=' + username, );
  }

  updateUser(user: User): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/updateUser', user,  {headers: headers});
  }

  deleteUser(url): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(url, {headers: headers});
  }

  retirerAdmin(url, data): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, data, {headers: headers});
  }
  ajouterAdmin(username): Observable < any > {
    let params = new HttpParams();
    params = params.set('username', username);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/ajouterAdmin', params, {headers: headers});
  }


  // <---------- Methodes for ADMIN ---------------->

  getAllAdmin(): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/utilisateurs/search/findByRoles?role=ADMIN', { headers: headers});
  }

  bloquer(abonne, cause) {
    let admin = this.authService.getUsername();
    let params = new HttpParams();
    params = params.set('admin', admin);
    params = params.set('abonne', abonne);
    params = params.set('cause', cause);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/bloquerAbonne', params , {headers: headers});
  }

  debloquer(abonne, cause) {
    let admin = this.authService.getUsername();
    let params = new HttpParams();
    params = params.set('admin', admin);
    params = params.set('abonne', abonne);
    params = params.set('cause', cause);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/debloquerAbonne', params , {headers: headers});
  }

  supprimer(abonne, cause) {
    let admin = this.authService.getUsername();
    let params = new HttpParams();
    params = params.set('admin', admin);
    params = params.set('abonne', abonne);
    params = params.set('cause', cause);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/supprimerAbonne', params , {headers: headers});
  }

  ajouterFavoris(id: string) {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    let params = new HttpParams()
    .set('id', id);
    return this.http.patch(this.host + '/addFavoris', {}, {headers: headers, params: params});
  }

  supprimerFavoris(id: string) {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    let params = new HttpParams()
    .set('id', id);
    return this.http.patch(this.host + '/deleteFavoris', {}, {headers: headers, params: params});
  }

  isFavoris(id: string) {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    let params = new HttpParams()
    .set('id', id);
    return this.http.get(this.host + '/isFavoris', {headers: headers, params: params});
  }
}
