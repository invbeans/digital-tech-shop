import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { EditObject } from 'src/app/shared/models/edit-object';
import { Manufacturer } from 'src/app/shared/models/manufacturer';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-manufacturer-page',
  templateUrl: './manufacturer-page.component.html',
  styleUrls: ['./manufacturer-page.component.scss']
})
export class ManufacturerPageComponent implements OnInit {
  manufacturers: Manufacturer[] = []
  readonlyArr: boolean[] = []
  tempManufacturer: Manufacturer = {} as Manufacturer

  constructor(private storefrontService: StorefrontService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getManufacturers()
  }

  onEditSaveClick(editObject: EditObject) {
    this.readonlyArr[editObject.index] = !this.readonlyArr[editObject.index]
    if (!editObject.isEdit) { //то есть нажатие на кнопку "Сохранить"
      this.storefrontService.changeManufacturerById(this.manufacturers[editObject.index].id || 0, this.tempManufacturer)
        .subscribe((data: any) => {
          console.log(data)
          if (data.name) {
            this.manufacturers[editObject.index] = data
          }
        })
    }
  }

  onDeleteClick(id: number){
    this.storefrontService.deleteManufacturerById(this.manufacturers[id].id || 0)
    .subscribe((data: any) => {
      this.manufacturers.filter(elem => elem.id != id)
      this.readonlyArr.pop()
    })
  }

  getManufacturers() {
    this.storefrontService.getManufacturers()
      .subscribe((data: any) => {
        this.manufacturers = data
        for (let elem of data) {
          this.readonlyArr.push(true)
        }
      })
  }

  onManufacturerChanged(manufacturer: Manufacturer) {
    this.tempManufacturer = manufacturer
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if (!logined) {
        this.router.navigate(['/auth'])
      }
    })
  }

  onNewManufacturerClick(){
    this.manufacturers.splice(0, 0, new Manufacturer(0, "", ""))
    this.readonlyArr.splice(0, 0, true)
  }

}
