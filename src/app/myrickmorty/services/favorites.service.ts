import { Injectable } from '@angular/core';
import { EpisodioFavoritoInterface } from '../interface/episodeFavorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  guardarLocalStore(item: EpisodioFavoritoInterface): void {
    let itemEpisodes = localStorage.getItem('favorites');
    let items: EpisodioFavoritoInterface[] = [];

    if (itemEpisodes) {
      items = JSON.parse(itemEpisodes);
    }else{
      localStorage.setItem('favorites', JSON.stringify([]));
    }

    if (!items.some(episode => (episode.id === item.id) && (episode.idUser === item.idUser))) {
      items.push(item);
      localStorage.setItem('favorites', JSON.stringify(items));
    }
  }

  obtenerEpisodiosFavoritos(idUser: number): EpisodioFavoritoInterface[] {
    const item = localStorage.getItem('favorites');

    if (!item) {
      localStorage.setItem('favorites', JSON.stringify([]));
      return [];
    }


    const itemEpisodes: EpisodioFavoritoInterface[] = JSON.parse(item);

    const episodiosFiltrados = itemEpisodes.filter(episodioFavorito => episodioFavorito.idUser === idUser);

    return episodiosFiltrados;
  }

  eliminarFavoritos(idUser: number, idEpisodio: number): void {
    const item = localStorage.getItem('favorites');
    if (!item) {
      localStorage.setItem('favorites', JSON.stringify([]));
    } else {
      const itemEpisodes: EpisodioFavoritoInterface[] = JSON.parse(item);

      const episodiosFiltrados: EpisodioFavoritoInterface[] = itemEpisodes.filter(episodioFavorito =>
        !(episodioFavorito.idUser === idUser && episodioFavorito.id === idEpisodio)
      );
      localStorage.setItem('favorites', JSON.stringify(episodiosFiltrados));
    }
  }

}
