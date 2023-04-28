import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.scss']
})
export class OrderTrackPageComponent implements OnInit {
  id: number = 0
  constructor(private router: Router, private authService: AuthService){
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.id = this.router.getCurrentNavigation()?.extras?.state?.['orderId'];
    }
  }
  ngOnInit(): void {
    this.checkAuth()
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
