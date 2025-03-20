import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { EpisodioFavoritoInterface } from '../../interface/episodeFavorite';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'] // Cambia styleUrl a styleUrls
})
export class FavoritesComponent {
  favoritosServicio = inject(FavoritesService);
  authService = inject(AuthService);
  favoritos: EpisodioFavoritoInterface[] = [];

  ngOnInit() {
    // Obtener los favoritos al inicializar el componente
    this.actualizarFavoritos();
  }

  actualizarFavoritos() {
    this.favoritos = this.favoritosServicio.obtenerEpisodiosFavoritos(this.authService.getCurrentUser()!.id);
  }

  eliminarFavorito(idEpisodio: number) {
    const idUser = this.authService.getCurrentUser()!.id;
    this.favoritosServicio.eliminarFavoritos(idUser, idEpisodio);
    this.actualizarFavoritos(); // Actualizar la lista después de eliminar
  }
}
