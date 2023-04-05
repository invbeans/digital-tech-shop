import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop-client';

  card_title = "Заголовок";
  card_content = "Какой-то текст";

  isInput = false

  constructor(){}

  onEditSaveClick(isEdit: boolean){
    this.isInput = !isEdit;
  }

  onDeleteClick(){
    this.card_title = "А карточку удалили!";
  }
}
