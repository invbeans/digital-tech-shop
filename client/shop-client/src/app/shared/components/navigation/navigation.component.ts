import { Component} from '@angular/core';
import { SidebarService } from '../../services/show-sidebar/sidebar.service';
import { SearchService } from '../../services/search/search.service';
import { Product } from '../../models/product';
import { SearchProductsService } from '../../services/search-products-state/search-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [SearchService]
})
export class NavigationComponent {
  constructor(public sidebarService: SidebarService, private router: Router, private searchService: SearchService, private searchProductsService: SearchProductsService) { }
  inputString = ''

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

  productsSearch(products: Product[]){
    this.searchProductsService.updateProducts(products)
    this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
      this.router.navigate(['/search_products'])
    })
  }
}
