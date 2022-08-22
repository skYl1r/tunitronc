import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  private host = environment.host;

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAllGestionAbonne(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/gestionAbonnes', {headers});
  }

  getAllGestionAnnonce(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/gestionAnnonces', {headers});
  }

  getAllAnnonceReclamation(): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/signalAnnonces', {headers});
  }
}
