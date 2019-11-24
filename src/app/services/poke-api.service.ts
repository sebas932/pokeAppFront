import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { AuthGuardService } from './../services/auth-guard.service';


const endpoint = 'http://localhost/pokeApp/wp-json/pokeapi/v1';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public getPokemons(): Observable<any> {
    return this.getQuery('pokemon' ).pipe(
      map(this.extractData));
  }

  public getPokemonByID(id): Observable<any> {
    return this.getQuery('pokemon/' + id ).pipe(
      map(this.extractData));
  }

  private getQuery(query:string){
    let endQuery = endpoint + '/' + query;
    return this.http.get(endQuery, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    });
  }
}
