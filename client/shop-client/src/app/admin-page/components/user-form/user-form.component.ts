import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/models/role';
import { UserAdminPage } from 'src/app/shared/models/user-admin-page';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() userInfo: UserAdminPage = {} as UserAdminPage
  userForm: FormGroup
  @Input() readonly = true
  @Input() roles: Role[] = []
  @Output() roleChanged = new EventEmitter<number>()

  constructor(){
    this.userForm = new FormGroup({
      "username": new FormControl("", [Validators.required]),
      "surname": new FormControl("", [Validators.required]),
      "firstname": new FormControl("", [Validators.required]),
      "lastname": new FormControl("", [Validators.required]),
      "phone_number": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required]),
      "role": new FormControl(Validators.required)
    })
  }

  ngOnInit(): void {
    this.userForm.controls["username"].setValue(this.userInfo.username)
    this.userForm.controls["surname"].setValue(this.userInfo.surname)
    this.userForm.controls["firstname"].setValue(this.userInfo.firstname)
    this.userForm.controls["lastname"].setValue(this.userInfo.lastname)
    this.userForm.controls["phone_number"].setValue(this.userInfo.phone_number)
    this.userForm.controls["email"].setValue(this.userInfo.email)
    this.userForm.controls["role"].setValue(this.userInfo.role)
  }

  onRoleOptionClick(e: any){
    this.roleChanged.emit(e.target.value)
  }

}
