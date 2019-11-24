import { Component, OnInit } from '@angular/core';

import { WordpressServiceService } from './../../services/wordpress-service.service';
import { PokeApiService } from './../../services/poke-api.service';

@Component({
  selector: 'app-my-pokemons-page',
  templateUrl: './my-pokemons-page.component.html',
  styleUrls: ['./my-pokemons-page.component.css']
})
export class MyPokemonsPageComponent implements OnInit {

  pokemosnAvailable;
  myPokemonList:any[] = [];

  constructor(public wpService:WordpressServiceService, public pokeApi:PokeApiService) { }

  ngOnInit() {
    // Get User pokemons
    this.wpService.getUserInfo().subscribe((data:any) => {
      let idsString = (data.meta.my_pokemon_ids).replace(/\s/g, '');
      if(idsString){
        this.myPokemonList  = idsString.split(",");
      }
    });

    // Get List of all available pokemons
    this.pokeApi.getPokemons().subscribe((data:any) => {
      this.pokemosnAvailable = data;
    });
  }

  updateMyPokemons(id){

    if(this.myPokemonList.includes(id)){
      // Remove from list
      var index = this.myPokemonList.indexOf(id);
      if (index !== -1) this.myPokemonList.splice(index, 1);

    }else{
      // Add to list
      this.myPokemonList.push(id);
    }

    this.wpService.updateUserPokemon(this.myPokemonList.join(",")).subscribe((data:any) => {
       console.log("My pokemons updated", data);
    });
  }

  disableCheckBoxes(){
    return (this.myPokemonList.length == 10);
  }

  isPokemonChecked(id){
    if(id){
      return this.myPokemonList.includes(id);
    }
    return false;
  }

}
