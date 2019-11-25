import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthGuardService } from './../../services/auth-guard.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: any;
  password: any;

  message: string = "";

  constructor(public router:Router, public auth:AuthGuardService) {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['myPokemons']);
    }
  }

  ngOnInit() {

  }

  onLogin(){
    console.log(this.username, this.password);
    this.auth.postLogin(this.username, this.password).subscribe(data => {
      let userInfo: any = data;
      userInfo.basicAuth = btoa(this.username + ":" + this.password);
      console.log(userInfo);
      localStorage.setItem('wpToken', JSON.stringify(userInfo));

      this.router.navigate(['myPokemons']);
    },
    err => {
      this.message = err.error.message;
    });
  }


}
