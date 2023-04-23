import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shop-client';
  isLogin: boolean = true;
  userRole = 0;

  /*card_title = "Заголовок";
  card_content = "Какой-то текст";

  isInput = false*/

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['refresh'] === 'true') {
        this.router.navigate(['/'], {state: {isLogin: this.isLogin}}).then(() => location.reload())
      }
    })
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe((data: any) => {
      if (localStorage.getItem('token')) {
        this.isLogin = false
        //this.userRole = data.userDto.role
      } else this.isLogin = true
    })
  }

  /*onEditSaveClick(isEdit: boolean){
    this.isInput = !isEdit;
  }

  onDeleteClick(){
    this.card_title = "А карточку удалили!";
  }*/
}
