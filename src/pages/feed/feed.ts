import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public lista_filmes = new Array<any>();
  public page = 1;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();

  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando();
    this.movieProvider.getLatesMovies(this.page).subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      if(newpage){
        this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
        this.infiniteScroll.complete();
      }else{
        this.lista_filmes = objeto_retorno.results;
      }
 
      console.log(objeto_retorno);
      this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }, error => {
      console.log(error);
      this.fechaCarregando();
    }
    );
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmesDetalhesPage, { id: filme.id });
    
  }

}
