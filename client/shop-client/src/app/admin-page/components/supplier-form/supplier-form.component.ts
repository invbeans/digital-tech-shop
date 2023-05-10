import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/shared/models/supplier';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  @Input() supplier: Supplier = {} as Supplier
  @Input() readonly = true
  @Output() supplierChanged = new EventEmitter<Supplier>()
  supplierForm: FormGroup

  constructor(){
    this.supplierForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required]),
      "phone": new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.supplierForm.controls["name"].setValue(this.supplier.name)
    this.supplierForm.controls["email"].setValue(this.supplier.email)
    this.supplierForm.controls["phone"].setValue(this.supplier.phone)
  }

  onSupplierChanged(){
    this.supplierChanged.emit(
      new Supplier(this.supplier.id, this.supplierForm.controls["name"].getRawValue(), this.supplierForm.controls["email"].getRawValue(), this.supplierForm.controls["phone"].getRawValue())
    )
  }

}
