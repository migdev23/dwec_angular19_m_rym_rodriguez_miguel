import { Component, inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from '../../../rickmorty/services/character.service';

@Component({
  selector: 'app-collapse',
  standalone: false,
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.css'
})
export class CollapseComponent {
  @Input() characters: string[] = [];
  private characterService = inject(CharacterService);

  className: string = 'd-none';
  htmlContent: string = '';
  peticionRealizada = false;

  onClick() {
    if(this.className == 'd-block'){
      this.className = 'd-none';
    }else{
      this.characters.forEach(element => {
        let lastDigit = element.match(/(\d+)$/);

        if (lastDigit) {
          let characterId = lastDigit[0];
          if(!this.peticionRealizada){
            this.characterService.getCharactersId(characterId).subscribe(
              ({image}) => {
                this.htmlContent += `
                <img src='${image}' class='img-fluid rounded-circle m-2' width='40'>
                `;

                this.peticionRealizada = true;

              })
          }
        }
      });
      this.className = 'd-block';
    }

  }
}
