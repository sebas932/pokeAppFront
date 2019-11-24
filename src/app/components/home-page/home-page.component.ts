import { Component, OnInit } from '@angular/core';

import { WordpressServiceService } from './../../services/wordpress-service.service';
import { PokeApiService } from './../../services/poke-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  myPokemonList:any[] = [];

  pokemonSelected:any[] = [ {}, {} ];
  selectedSlot:number = 0;

  constructor( public wpService:WordpressServiceService, public pokeApi:PokeApiService) { }

  ngOnInit() {
    // Get User Pokemons
    this.wpService.getUserInfo().subscribe((data:any) => {
      let ids = (data.meta.my_pokemon_ids).split(",");

      for (let id of ids) {
        if(id){
          this.pokeApi.getPokemonByID(id).subscribe((data:any) => {
            this.myPokemonList.push(data);
          });
        }
      }


    });

  }


  selectPokemon(pokemon){
    if(this.selectedSlot == this.pokemonSelected.length){
      this.selectedSlot = 0;
    }
    this.pokemonSelected[this.selectedSlot] = pokemon;
    this.selectedSlot += 1;
  }

}
