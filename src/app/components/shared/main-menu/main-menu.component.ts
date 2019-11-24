import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from './../../../services/auth-guard.service';
import { WordpressServiceService } from './../../../services/wordpress-service.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  userInfo:any;

  constructor(public auth:AuthGuardService, public wpService:WordpressServiceService) { }


  ngOnInit() {
    // Get User Info
    this.wpService.getUserInfo().subscribe((data:any) => {
      this.userInfo = data;
    });
  }

  logout(){
    this.auth.logout();
  }

}
