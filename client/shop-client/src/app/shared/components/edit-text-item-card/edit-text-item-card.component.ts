import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-text-item-card',
  templateUrl: './edit-text-item-card.component.html',
  styleUrls: ['./edit-text-item-card.component.scss']
})
export class EditTextItemCardComponent {
  @Input() title = "Заголовок";
  @Input() content = "Содержимое";

  isEdit = true;
  editSaveButtonName = "";

  @Output() editSaveClick = new EventEmitter<boolean>();
  @Output() deleteClick = new EventEmitter();

  constructor() {
    this.editSaveButtonName = "Редактировать";
  }

  onEditSaveClick(){
    this.isEdit = !this.isEdit;
    this.editSaveButtonName = (this.isEdit) ? "Редактировать" : "Сохранить";
    this.editSaveClick.emit(this.isEdit); //if true we change text to input form
  }

  onDeleteClick(){
    this.deleteClick.emit();
  }

}
