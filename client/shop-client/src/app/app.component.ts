import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop-client';

  card_title = "Времянка :D";
  card_content = "Заходит улитка в бар";

  isInput = false

  onEditSaveClick(isEdit: boolean){
    this.isInput = !isEdit;
  }

  onDeleteClick(){
    this.card_title = "А карточку удалили!";
  }
}
