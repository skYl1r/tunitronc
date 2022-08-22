import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private host = environment.host;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }





  edit(url, data): Observable <any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.patch(url, data , {headers : headers});
  }

  delete(url): Observable < any > {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    return this.http.delete(url, {headers: headers});
  }


  // <---------- Methodes for Category ---------------->


  getAllCategories(): Observable<any> {
    return this.http.get(this.host + '/categories');
  }

  saveCategory(cat): Observable<any> {
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});
    const data  = { 'nom': cat};
    return this.http.post(this.host + '/categories', data , { headers: headers});
  }


  getSubCategoriesByCategory(cat): Observable<any> {
    const url = `${this.host}/categories/search/findByNom?nom=` + cat;
    return this.http.get(url);
  }



  // <---------- Methodes for SubCategory ---------------->



  getSubCategories(url): Observable<any> {
    return this.http.get(url);
  }

  saveSubCategory(cat, scat): Observable < any > {
    let body = new HttpParams();
    body = body.set('idCat', cat);
    body = body.set('nom', scat);
    const headers = new HttpHeaders({'authorization': 'Bearer ' + this.authService.jwt});

    // console.log(body);
    return this.http.post(this.host + '/addSubCategory', body, {headers: headers});
  }

  getSubCategoriesByName(scat): Observable<any> {
    const url = this.host + '/sousCategories/search/findByNom?nom=' + scat;
    return this.http.get(url);
  }

}
