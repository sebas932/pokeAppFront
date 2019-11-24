import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyPokemonsPageComponent } from './components/my-pokemons-page/my-pokemons-page.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '',   component: LoginPageComponent },
  { path: 'home',   component: HomePageComponent, canActivate: [ AuthGuardService ] },
  { path: 'myPokemons',   component: MyPokemonsPageComponent, canActivate: [ AuthGuardService ] },


  { path: 'home',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
