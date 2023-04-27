import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShippingOrderService } from 'src/app/services/shipping-service/shipping-order.service';
import { Adress } from 'src/app/shared/models/adress';
import { City } from 'src/app/shared/models/city';
import { District } from 'src/app/shared/models/district';
import { Region } from 'src/app/shared/models/region';
import { Street } from 'src/app/shared/models/street';
import { StreetType } from 'src/app/shared/models/street-type';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {
  @Output() adressChange = new EventEmitter<Adress>()
  adressForm: FormGroup
  regions: Region[] = []
  cities: City[] = []
  districts: District[] = []
  streets: Street[] = []
  streetTypes: StreetType[] = []

  showCities = false
  showDistricts = false
  showStreets = false
  showStreetTypes = false

  constructor(private shippingOrderService: ShippingOrderService) {
    this.adressForm = new FormGroup({
      "region": new FormControl(Validators.required),
      "city": new FormControl(Validators.required),
      "district": new FormControl(Validators.required),
      "street": new FormControl(Validators.required),
      "streetType": new FormControl(Validators.required),
      "house": new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
      "building": new FormControl("", Validators.pattern("^[А-Яа-яёЁ]*$")),
      "apartment": new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
      "postcode": new FormControl("", [Validators.required, Validators.pattern("^[0-9]{6}$")])
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

  changeCity(e: any) {
    this.adressForm.controls["city"].setValue(e.target.value)
    this.getDistricts(e.target.value)
    this.showDistricts = true
  }

  changeDistrict(e: any) {
    this.adressForm.controls["district"].setValue(e.target.value)
    this.getStreets(e.target.value, this.adressForm.controls["city"].getRawValue())
    this.showStreets = true
  }

  changeStreet(e: any) {
    this.adressForm.controls["street"].setValue(e.target.value)
    this.getStreetTypes()
    this.showStreetTypes = true
  }

  changeStreetType(e: any) {
    this.adressForm.controls["streetType"].setValue(e.target.value)
  }

  getCities(id: number) {
    this.shippingOrderService.getCitiesByRegion(id)
      .subscribe((data: any) => {
        this.cities = data
      })
  }

  getDistricts(id: number) {
    this.shippingOrderService.getDistrictsByCity(id)
      .subscribe((data: any) => {
        this.districts = data
      })
  }

  getStreets(district: number, city: number) {
    this.shippingOrderService.getStreetByDistrictAndCity(district, city)
      .subscribe((data: any) => {
        this.streets = []
        for (let street of data) {
          this.streets.push(new Street(street.id, street.name))
        }
      })
  }

  getStreetTypes() {
    this.shippingOrderService.getStreetTypes()
      .subscribe((data: any) => {
        this.streetTypes = data
      })
  }

  submit() {
    let building = this.adressForm.controls["building"].getRawValue()
    if (building == "") building = null
    let adress = new Adress(null,
      this.prepareAdress(),
      this.adressForm.controls["region"].getRawValue(),
      this.adressForm.controls["streetType"].getRawValue(),
      this.adressForm.controls["house"].getRawValue(),
      building,
      this.adressForm.controls["apartment"].getRawValue(),
      this.adressForm.controls["postcode"].getRawValue(),
    )
    this.adressChange.emit(adress)
  }

  prepareAdress(): string{
    let stringAdress = this.regions.filter(reg => reg.id == this.adressForm.controls["region"].getRawValue())[0] 
    + ", " + this.cities.filter(city => city.id == this.adressForm.controls["city"].getRawValue())[0] + ", " 
    + this.districts.filter(dis => dis.id == this.adressForm.controls["district"].getRawValue())[0] 
    + ", " + this.streets.filter(str => str.id == this.adressForm.controls["street"].getRawValue())[0] + " "
    + this.streetTypes.filter(type => type.id == this.adressForm.controls["streetType"].getRawValue())[0]
    + ", д." + this.adressForm.controls["house"].getRawValue() 
    + this.adressForm.controls["building"].getRawValue() + ", кв." + this.adressForm.controls["apartment"].getRawValue() 
    + ", " + this.adressForm.controls["postcode"].getRawValue()
    return stringAdress
  }

  checkWhoInvalid() {
    Object.keys(this.adressForm.controls).forEach(key => {
      if (this.adressForm.get(key)?.invalid) console.log(this.adressForm.get(key))
    })
  }

}
