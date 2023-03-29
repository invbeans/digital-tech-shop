import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-text-item-card',
  templateUrl: './edit-text-item-card.component.html',
  styleUrls: ['./edit-text-item-card.component.scss']
})
export class EditTextItemCardComponent {
  @Input() title = "Заголовок";
  @Input() content = "Содержимое";

  

}
