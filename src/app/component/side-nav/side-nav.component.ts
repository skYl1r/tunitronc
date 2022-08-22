import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {Gouvernorat} from '../../model/gouvernorat';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  private categories;
  private subCatgories;
  private gov = Gouvernorat.gov ;
  private ville ;
  private balise = ['<i class="fas fa-book"></i>', '<i class="fas fa-tools"></i>' , '<i class="fas fa-car"></i>',
    '<i class="fas fa-tshirt"></i>', '<i class="fas fa-futbol"></i>', '<i class="fas fa-hands-helping"></i>'];

  constructor(private catService: CategoryService,
              private router: Router,
  ) { }

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
    // this.router.navigate(['c/', cat.nom]);
    this.router.navigate(['c', cat.nom]);
    const link = cat._links.sousCategories.href ;
    this.catService.getSubCategories(link).subscribe(scat => {
      this.subCatgories = scat._embedded.sousCategories;
      console.log(this.subCatgories);
    });
  }

  getVille(e) {
    const gov = e.target.value ;
    this.ville = this.gov.filter(value =>  value.name === gov );
    this.ville.forEach(v => { this.ville = v.villes; });
  }


}

