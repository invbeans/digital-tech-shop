import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manufacturer } from 'src/app/shared/models/manufacturer';

@Component({
  selector: 'app-manufacturer-form',
  templateUrl: './manufacturer-form.component.html',
  styleUrls: ['./manufacturer-form.component.scss']
})
export class ManufacturerFormComponent implements OnInit {
  @Input() manufacturer: Manufacturer = {} as Manufacturer
  @Input() readonly = true
  @Output() manufacturerChanged = new EventEmitter<Manufacturer>()
  manufacturerForm: FormGroup
  
  constructor(){
    this.manufacturerForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.manufacturerForm.controls["name"].setValue(this.manufacturer.name)
    this.manufacturerForm.controls["email"].setValue(this.manufacturer.email)
  }

  onManufacturerChanged(){
    this.manufacturerChanged.emit(
      new Manufacturer(this.manufacturer.id, this.manufacturerForm.controls["name"].getRawValue(), this.manufacturerForm.controls["email"].getRawValue())
    )
  }

}
