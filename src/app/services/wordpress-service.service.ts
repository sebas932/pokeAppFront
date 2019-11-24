import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { AuthGuardService } from './../services/auth-guard.service';


const endpoint = 'http://localhost/pokeApp/wp-json/wp/v2';


@Injectable({
  providedIn: 'root'
})
export class WordpressServiceService {

  constructor(private http: HttpClient, private auth:AuthGuardService) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public getUserInfo(): Observable<any> {
    return this.getQuery('users/me' ).pipe(
      map(this.extractData));
  }

  updateUserPokemon(ids): Observable<any> {
    return this.putQuery('users/me' , { meta: { my_pokemon_ids: ids} }).pipe(
      map(this.extractData));
  }

  private getQuery(query:string){
    let endQuery = endpoint + '/' + query;
    return this.http.get(endQuery, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + (this.auth.getUserInfo()).token
      })
    });
  }

  private postQuery(query:string, data:any){
    let endQuery = endpoint + '/' + query;
    return this.http.post(endQuery, data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + (this.auth.getUserInfo()).token
      })
    }).pipe(
      map(this.extractData));
  }

  private putQuery(query:string, data:any){
    let endQuery = endpoint + '/' + query;
    return this.http.put(endQuery, data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + (this.auth.getUserInfo()).token
      })
    }).pipe(
      map(this.extractData));
  }
}
