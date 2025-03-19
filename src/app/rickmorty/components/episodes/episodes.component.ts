import { Component, inject } from '@angular/core';
import { EpisodesService } from '../../services/episodes.service';

@Component({
  selector: 'app-episodes',
  standalone: false,
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  episodes: any[] = [];

  private episodesService = inject(EpisodesService);

  ngOnInit() {
    this.episodesService.getCharacters().subscribe(response => {
      this.episodes = response.results;
    });
  }

  extractCharacterId(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 1]);
  }


}
