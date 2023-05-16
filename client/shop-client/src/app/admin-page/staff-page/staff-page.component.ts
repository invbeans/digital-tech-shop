import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { EditObject } from 'src/app/shared/models/edit-object';
import { Role } from 'src/app/shared/models/role';
import { UserAdminPage } from 'src/app/shared/models/user-admin-page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.scss']
})
export class StaffPageComponent implements OnInit {
  userInfo: UserAdminPage[] = []
  roles: Role[] = []
  chosenRoleId: number = 0
  readonlyArr: boolean[]= []
  searchString: string = ""

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkAuth()
    this.getUsers()
    this.getRoles()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((data: any) => {
        this.userInfo = data
        for(let elem of data){
          this.readonlyArr.push(true)
        }
      })
  }

  getRoles(){
    this.userService.getRoles()
    .subscribe((data: any) => {
      this.roles = data
    })
  }

  onEditSaveClick(editObject: EditObject) {
    this.readonlyArr[editObject.index] = !this.readonlyArr[editObject.index]
    if(!editObject.isEdit){ //то есть нажатие на кнопку "Сохранить"
      this.userService.changeUserRole(this.userInfo[editObject.index].id, this.chosenRoleId)
      .subscribe((data: any) => {
        console.log(data)
        this.userInfo[editObject.index].role = this.roles.filter(elem => elem.id == data.role)[0].name
      })
    }
  }

  onRoleChanged(roleId: number){
    this.chosenRoleId = roleId
  }

  userSearchClick(){
    if(this.searchString.length > 0) {
      this.getSearchUsers()
    }
    else { //если сброс поиска
      this.getUsers()
    }
    
  }

  getSearchUsers(){
    this.userService.findUserBySurname(this.searchString)
    .subscribe((data: any) => {
      console.log(data)
      if(data.length > 0){
        this.userInfo = []
        this.userInfo = data
        this.readonlyArr = []
        for(let elem of data){
          this.readonlyArr.push(true)
        }
      }
    })
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