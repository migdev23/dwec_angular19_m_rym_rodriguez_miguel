import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar *ngFor
import { CharacterService } from '../../services/character.service';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent implements OnInit {
  characters: Character[] = []; // Arreglo para almacenar los personajes

  // Inyecta el servicio usando la función inject
  private characterService = inject(CharacterService);

  ngOnInit() {
    // Llama al servicio para obtener los personajes
    this.characterService.getCharacters().subscribe(response => {
      this.characters = this.getRandomCharacters(response.results, 6);
    });
  }

  getRandomCharacters(characters: Character[], count: number): Character[] {
    // Mezclamos la lista utilizando el algoritmo de Fisher-Yates
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]]; // Intercambia los elementos
    }

    // Tomamos los primeros 'count' elementos de la lista mezclada
    return characters.slice(0, count);
  }

}
