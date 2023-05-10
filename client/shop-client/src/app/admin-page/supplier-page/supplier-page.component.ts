import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorefrontService } from 'src/app/services/storefront-service/storefront.service';
import { EditObject } from 'src/app/shared/models/edit-object';
import { Supplier } from 'src/app/shared/models/supplier';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.scss']
})
export class SupplierPageComponent implements OnInit {
  suppliers: Supplier[] = []
  readonlyArr: boolean[] = []
  tempSupplier: Supplier = {} as Supplier

  constructor(private storefrontService: StorefrontService, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.checkAuth()
    this.getSuppliers()
  }

  getSuppliers() {
    this.storefrontService.getSuppliers()
      .subscribe((data: any) => {
        this.suppliers = data
        for (let elem of data) {
          this.readonlyArr.push(true)
        }
      })
  }

  onEditSaveClick(editObject: EditObject) {
    this.readonlyArr[editObject.index] = !this.readonlyArr[editObject.index]
    if (!editObject.isEdit) { //то есть нажатие на кнопку "Сохранить"
      this.storefrontService.changeSupplierById(this.suppliers[editObject.index].id || 0, this.tempSupplier)
        .subscribe((data: any) => {
          console.log(data)
          if (data.name) {
            this.suppliers[editObject.index] = data
          }
        })
    }
  }

  onDeleteClick(id: number){
    this.storefrontService.deleteSupplierById(this.suppliers[id].id || 0)
    .subscribe((data: any) => {
      this.suppliers.filter(elem => elem.id != id)
      this.readonlyArr.pop()
    })
  }

  onNewSupplierClick(){
    this.suppliers.splice(0, 0, new Supplier(0, "", "", ""))
    this.readonlyArr.splice(0, 0, true)
  }

  onSupplierChanged(supplier: Supplier){
    this.tempSupplier = supplier
  }

  checkAuth() {
    this.authService.checkAuth().subscribe((data: any) => {
      let logined = this.authService.getAuth()
      if (!logined) {
        this.router.navigate(['/auth'])
      }
    })
  }
}
