import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReturnApplication } from 'src/app/shared/models/return-application';

@Component({
  selector: 'app-return-item',
  templateUrl: './return-item.component.html',
  styleUrls: ['./return-item.component.scss']
})
export class ReturnItemComponent implements OnInit {
  @Input() returnApplication: ReturnApplication = {} as ReturnApplication
  @Output() applicationClicked = new EventEmitter<number>()
  @Output() changeStatus = new EventEmitter<number>()
  showStr: string[] = ["Отклонена", "Принята"]
  currentStatus = false
  oppositeStatus = false
  showText = false

  ngOnInit(): void {
    this.currentStatus = this.returnApplication.approved
    this.oppositeStatus = !this.currentStatus
  }

  statusChange() {
    this.returnApplication.approved = !this.returnApplication.approved
  }

  onApplicationClick(){
    this.showText = true
    this.applicationClicked.emit(this.returnApplication.id || 0)
  }

  onSubmitClick(){
    this.changeStatus.emit(this.returnApplication.id || 0)
  }

}
