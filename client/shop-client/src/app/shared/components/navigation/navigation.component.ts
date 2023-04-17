import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SidebarService } from '../../services/show-sidebar/sidebar.service';
import { SearchService } from '../../services/search/search.service';
import { Product } from '../../models/product';
import { SearchProductsService } from '../../services/search-products-state/search-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [SearchService]
})
export class NavigationComponent implements OnChanges {
  @Input() isLogin = true;
  LOGIN_A_TEXT = "Войти/Зарегистрироваться"
  LOGOUT_A_TEXT = "Выйти"
  LOGIN_LINK = "/auth"
  LOGOUT_LINK = "/"
  login_logout_a_text = "Загрузка..."


  constructor(public sidebarService: SidebarService,
    private router: Router,
    private searchService: SearchService,
    private searchProductsService: SearchProductsService,
    private authService: AuthService) {
    }

  ngOnChanges(changes: SimpleChanges): void {
    for(const isLogin in changes){
      const change = changes[isLogin]
      this.isLogin = change.currentValue
    }
    this.login_logout_a_text = (this.isLogin) ? this.LOGIN_A_TEXT : this.LOGOUT_A_TEXT
  }

  inputString = ''

  onLogClick() {
    if (this.isLogin) {
      this.router.navigate([this.LOGIN_LINK])
    }
    else {
      this.authService.logout()
      .subscribe(() => {
        this.router.navigate([this.LOGOUT_LINK], {queryParams: {'refresh': true}})
        console.log("logout")
      })
    }
  }

  toggleSidebar() {
    this.sidebarService.toggle()
  }

  clickSearch(searchStr: string) {
    if (searchStr !== "") {
      this.searchService.searchProducts(searchStr)
        .subscribe((data: any) => {
          this.productsSearch(data)
        })
    }
  }

  productsSearch(products: Product[]) {
    this.searchProductsService.updateProducts(products)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/search_products'])
    })
  }
}
