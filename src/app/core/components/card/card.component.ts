import { Component, Input } from '@angular/core';
import { Character } from '../../../rickmorty/interfaces/character';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() character!:Character;
}
