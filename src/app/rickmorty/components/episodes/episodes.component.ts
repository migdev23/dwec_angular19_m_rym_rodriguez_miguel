import { Component, inject } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';
import { EpisodioFavoritoInterface } from '../../../myrickmorty/interface/episodeFavorite';
import * as bootstrap from 'bootstrap';
import { Episode } from '../../interfaces/episode';
import { AuthService } from '../../../auth/services/auth.service';
import { FavoritesService } from '../../../myrickmorty/services/favorites.service';


@Component({
  selector: 'app-episodes',
  standalone: false,
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  private episodesService = inject(EpisodesService);
  private authService = inject(AuthService);
  private favoriteService = inject(FavoritesService);

  episodes: any[] = [];
  misEpisodiosFavoritos: EpisodioFavoritoInterface[] =  this.favoriteService.obtenerEpisodiosFavoritos(this.authService.getCurrentUser()!.id)
  episodeSelected: Episode | null = null;

  puntuacion: number = 1;
  observacion: string = '';


  esEpisodioFavorito(id: number): boolean {
    return this.misEpisodiosFavoritos.some(episodio => episodio.id === id);
  }

  ngOnInit() {
    this.episodesService.getCharacters().subscribe(response => {
      this.episodes = response.results;
    });
  }

  extractCharacterId(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 1]);
  }

  openModal(id: number): void {
    this.episodeSelected = this.episodes.find(episode => episode.id === id);

    const modalElement = document.getElementById('exampleModal');


    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  guardar() {
    const valoracionObjeto: EpisodioFavoritoInterface = {
      idUser: this.authService.getCurrentUser()!.id,
      id: this.episodeSelected!.id,
      observacion: this.observacion,
      valoracion: this.puntuacion,
      name:this.episodeSelected!.name,
      air_date:this.episodeSelected!.air_date,
      episode:this.episodeSelected!.episode,
      url:this.episodeSelected!.url
    };

    const modal = document.getElementById('exampleModal');

    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }

    this.favoriteService.guardarLocalStore(valoracionObjeto);
    this.misEpisodiosFavoritos = this.favoriteService.obtenerEpisodiosFavoritos(this.authService.getCurrentUser()!.id)

    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    this.episodeSelected = null;
    this.observacion = '';
    this.puntuacion = 1;
  }

  borrar(id:number){
    this.favoriteService.eliminarFavoritos(this.authService.getCurrentUser()!.id, id);
    this.misEpisodiosFavoritos = this.favoriteService.obtenerEpisodiosFavoritos(this.authService.getCurrentUser()!.id)
  }

  getStarsArray(valoracion: number): number[] {
    return new Array(valoracion).fill(1);
  }

}
