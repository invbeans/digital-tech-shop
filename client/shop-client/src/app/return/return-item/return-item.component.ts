import { Component, Input, OnInit } from '@angular/core';
import { ReturnApplication } from 'src/app/shared/models/return-application';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.scss']
})
export class ReturnItemComponent implements OnInit {
  @Input() returnApplication: ReturnApplication = {} as ReturnApplication
  approved = ""

  ngOnInit(): void {
    this.approved = (this.returnApplication.approved) ? "Заявка принята" : "Заявка не принята"
  }
}
