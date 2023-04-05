import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-category-item',
  templateUrl: './sub-category-item.component.html',
  styleUrls: ['./sub-category-item.component.scss']
})
export class SubCategoryItemComponent {
  @Input() name = ""
}
