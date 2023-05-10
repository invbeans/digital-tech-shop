import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShippingMethod } from 'src/app/shared/models/shipping-method';
import { ShippingService } from 'src/app/shared/models/shipping-service';
import { ShippingServiceAdmin } from 'src/app/shared/models/shipping-service-admin';

@Component({
  selector: 'app-shipping-service-form',
  templateUrl: './shipping-service-form.component.html',
  styleUrls: ['./shipping-service-form.component.scss']
})
export class ShippingServiceFormComponent implements OnInit {
  @Input() shippingService: ShippingServiceAdmin = {} as ShippingServiceAdmin
  shippingServiceForm: FormGroup
  @Input() readonly = true
  @Input() shippingMethods: ShippingMethod[] = []
  @Output() shippingServiceChanged = new EventEmitter<ShippingService>()
  tempShippingService: ShippingService = new ShippingService(0, "", 0, 0)

  constructor() {
    this.shippingServiceForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "shippingMethod": new FormControl("", [Validators.required]),
      "price": new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.shippingServiceForm.controls["name"].setValue(this.shippingService.name)
    this.shippingServiceForm.controls["shippingMethod"].setValue(this.shippingService.shippingMethod)
    this.shippingServiceForm.controls["price"].setValue(this.shippingService.price)
    let index = this.shippingMethods.filter(elem => elem.name == this.shippingService.shippingMethod)[0]?.id || 1
    this.tempShippingService = new ShippingService(this.shippingService.id || 0, this.shippingService.name, index || 0, this.shippingService.price)
  }

  onShippingServiceChanged(e: any) {
    this.shippingServiceChanged.emit(this.tempShippingService)
  }

  onNameChanged(e: any) {
    this.tempShippingService.name = e.target.value
  }

  onPriceChanged(e: any) {
    this.tempShippingService.price = e.target.value
  }

  onShippingMethodChanged(e: any) {
    this.tempShippingService.shippingMethod = e.target.value
  }

}
