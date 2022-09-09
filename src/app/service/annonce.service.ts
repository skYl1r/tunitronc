import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment'
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private host = environment.host;


  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  saveAnnonce(data): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/publierAnnonce', data , { headers: headers});
  }

  getAnnonce(id): Observable<any> {
    // const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/annonces/' + id);
  }

  getAllAnnonce(): Observable<any> {
    // const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.get(this.host + '/annonces');
  }

  supprimer(annonce, cause): Observable<any> {
    const admin = this.authService.getUsername();
    let params = new HttpParams();
    params = params.set('admin', admin);
    params = params.set('annonce', annonce);
    params = params.set('cause', cause);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/supprimerAnnonce', params , {headers: headers});
  }

  getAnnonceByUrl(url): Observable<any> {
    return this.http.get(url);
  }

  getAnnoncesByGovenorat(gov): Observable<any> {
    return this.http.get(this.host + '/annonces/search/findAnnonceByGouvernorat?gov=' + gov);
  }

 getAnnonceBySousCategorie(url): Observable<any> {
   return this.http.get(url);
 }

 getAnnonceByCategorie(cat): Observable<any> {
    return this.http.get(this.host + '/annonces/search/findAnnonceByCategorie?cat=' + cat);
 }



  getAnnonceByMotCle(motCle): Observable<any> {
    const params = new HttpParams().set('motCle', motCle);
    params.append('motCle', motCle);
    return this.http.get(this.host + '/recherche/motCle', { params : params});
  }
  getAnnonces( currentVille: any, currentCategorie: any, currentSubCatgorie: any) {

    console.log(currentVille);
    console.log(currentCategorie);
    console.log(currentSubCatgorie);
  }
  getAnnonces2(currentGov: any, currentCategorie: any, currentSubCatgorie: any) {
    console.log(currentGov);
    console.log(currentCategorie);
    console.log(currentSubCatgorie);
  }
  getAnnonces3( currentCategorie: any, currentSubCatgorie: any) {
    console.log(currentCategorie);
    console.log(currentSubCatgorie);
  }


  suggererAnnonce(annonce): Observable<any> {
    const url = annonce._links.self.href;
      const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, annonce, {headers: headers});
  }

  commenter(idAnnonce, contenu, username): Observable<any> {
    let params = new HttpParams();
    params = params.set('idAnnonce', idAnnonce);
    params = params.set('contenu', contenu);
    params = params.set('username', username);

    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/commenter', params, {headers: headers});
  }

  signalerAnnonce(idAnnonce: any, cause: any, username: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('idAnnonce', idAnnonce);
    params = params.set('cause', cause);
    params = params.set('username', username);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.post(this.host + '/signalerAnnonce', params, {headers: headers});
  }


  deleteAnnonceURL(id: string): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(this.host + '/annonces/' + id, {headers: headers});
  }
}
