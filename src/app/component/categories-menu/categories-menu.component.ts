import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {

  private categories;
  private subCatgories;

  constructor(private catService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.catService.getAllCategories().subscribe(data => {
      this.categories = data._embedded.categories ;
    }, err => {
      console.log(err);
    });
  }

  getSubCategories(cat) {
    const link = cat._links.sousCategories.href ;
    this.catService.getSubCategories(link).subscribe(scat => {
      this.subCatgories = scat._embedded.sousCategories ;
      console.log(this.subCatgories);
    });
  }

}
