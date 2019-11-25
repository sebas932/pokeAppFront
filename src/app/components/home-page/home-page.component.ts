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

  isLoading:boolean = true;

  constructor( public wpService:WordpressServiceService, public pokeApi:PokeApiService) { }

  ngOnInit() {
    // Get User Pokemons
    this.wpService.getUserInfo().subscribe((data:any) => {
      let idsString = data.meta.my_pokemon_ids;
      if(idsString){
        let ids = idsString.split(",");
        for (let id of ids) {
          this.pokeApi.getPokemonByID(id).subscribe((data:any) => {
            this.myPokemonList.push(data);
            this.isLoading = false;
          });
        }
      }else{
        this.isLoading = false;
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
