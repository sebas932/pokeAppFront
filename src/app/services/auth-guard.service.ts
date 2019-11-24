import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment} from '../../envrionment';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  api_url = 'http://localhost/pokeApp/wp-json/jwt-auth/v1/token';

  constructor( public router:Router, public http: HttpClient) {

  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
     if(!this.isAuthenticated()){
       this.router.navigate(['']);
       return false;
     }
    return true;
  }

  public isAuthenticated(): boolean {
    if(localStorage.getItem('wpToken')){
      return true;
    }
    return false;
  }

  public getUserInfo(): any{
    if(this.isAuthenticated()){
      return JSON.parse(localStorage.getItem('wpToken'));
    }
    return {};
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('wpToken');
    // Go back to the home route
    this.router.navigate(['']);
  }

  postLogin(username, password){
    let data = {
      username: username,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.api_url, data, {headers: headers});
  }
}
