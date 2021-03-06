import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: Http) {
    
  }

  //Url para buscar filmes populares na webapi movieDB
  getLatesMovies(page = 1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey()+"&language=pt-BR");
  }

  //Detalhes dos filmes
  getMovieDetails(filmeId){
    return this.http.get(this.baseApiPath + `/movie/${filmeId}?api_key=` + this.getApiKey()+"&language=pt-BR");
  }

  //ApiKey uma para cada usuário
  getApiKey(): string{
    let valueKey = "3d3089084d3030841c3dfcdd2893bd9a";
    return valueKey;
  }

}
