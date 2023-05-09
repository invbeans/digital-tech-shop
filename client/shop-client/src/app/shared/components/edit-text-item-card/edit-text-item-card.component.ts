import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditObject } from '../../models/edit-object';

@Component({
  selector: 'app-edit-text-item-card',
  templateUrl: './edit-text-item-card.component.html',
  styleUrls: ['./edit-text-item-card.component.scss']
})
export class EditTextItemCardComponent {
  @Input() title = "Заголовок";
  @Input() index = 0;
  @Input() hasDelete = false;

  isEdit = false;
  editSaveButtonName = "";

  @Output() editSaveClick = new EventEmitter<EditObject>();
  @Output() deleteClick = new EventEmitter<number>();

  constructor() {
    this.editSaveButtonName = "Редактировать";
  }

  onEditSaveClick(){
    this.isEdit = !this.isEdit;
    this.editSaveButtonName = (!this.isEdit) ? "Редактировать" : "Сохранить";
    let editObject = new EditObject(this.index, this.isEdit);
    this.editSaveClick.emit(editObject); //if true we change text to input form
  }

  onDeleteClick(){
    this.deleteClick.emit(this.index);
  }

}
