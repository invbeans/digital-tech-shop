import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { City } from 'src/app/shared/models/city';
import { Region } from 'src/app/shared/models/region';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  adressForm: FormGroup
  regions: Region[] = []
  cities: City[] = []
  showCities = false

  constructor(private shippingOrderService: ShippingOrderService) {
    this.adressForm = new FormGroup({
      "region": new FormControl(),
      "city": new FormControl()
    })
  }

  ngOnInit(): void {
    this.shippingOrderService.getRegions()
      .subscribe((data: any) => {
        this.regions = data
      })
  }

  changeRegion(e: any) {
    this.adressForm.controls["region"].setValue(e.target.value)
    this.getCities(e.target.value)
    this.showCities = true
  }

  changeCity(e: any){
    this.adressForm.controls["city"].setValue(e.target.value)
  }

  getCities(id: number) {
    this.shippingOrderService.getCitiesByRegion(id)
      .subscribe((data: any) => {
        this.cities = data
        console.log(data)
      })
  }

  submit() {
    console.log(this.adressForm.value.city)
  }

}
