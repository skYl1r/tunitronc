import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-gest-categorie',
  templateUrl: './gest-categorie.component.html',
  styleUrls: ['./gest-categorie.component.scss']
})
export class GestCategorieComponent implements OnInit {
  private catgories ;
  private subCatgories ;
  private currentCategory;
  private currentSubCat;
  private nameCat;
  private mode ;
  private nameSubCat;



  constructor(private catService: CategoryService ) {
  }

  ngOnInit() {
    this.onAllCategories();
  }

  // <---------- Methodes for Category ---------------->


  onAllCategories() {
    this.catService.getAllCategories().subscribe(data => {
      this.catgories = data._embedded.categories ;
    }, err => {
      console.log(err);
    });
  }


  onSaveCat(cat) {
    this.catService.saveCategory(cat.nom).subscribe(data => {
      this.onAllCategories();
      this.mode = '';
    }, err => {
      console.log(err);
    });
  }

  onEditCat(cat) {
    this.mode = 'edit-cat';
    this.currentCategory = cat;
    this.nameCat = cat.nom;
  }

  onUpdateCat(cat) {
    // console.log(scat);
    this.catService.edit(this.currentCategory._links.self.href, cat).subscribe(data => {
      this.onAllCategories();
      this.mode = '';
    }, err => {
      console.log(err);
    });
  }


  onDeleteCat(cat) {
    const url = cat._links.self.href;
    const c = confirm('Etes vous sure de supprimer?');
    if (!c) {return; }

    this.catService.delete(url).subscribe(data => {
      this.onAllCategories();
      this.subCatgories = null;
      this.currentCategory = null;

    }, err => {
      console.log(err);
    });
  }


  // <---------- Methodes for Category ---------------->

  onGetSubCategories(cat) {
    // console.log(cat._links.subCategories.href);
    this.currentCategory = cat;
    const url = cat._links.sousCategories.href ;
    this.catService.getSubCategories(url).subscribe(data => {
      this.subCatgories = data._embedded.sousCategories;
    }, err => {
      console.log(err);
    });
  }


  onSaveSubCat(scat) {
  this.catService.saveSubCategory(this.currentCategory.id, scat.nom).subscribe(data => {
    this.onGetSubCategories(this.currentCategory);
    this.mode = '';
  }, err => {
    console.log(err);
  });
  }

  onEditsubCat(scat) {
    this.mode = 'edit-sub-cat';
    this.currentSubCat = scat;
    this.nameSubCat = scat.nom;
  }

  onUpdateSubCat(scat) {
    // console.log(scat);
    this.catService.edit(this.currentSubCat._links.self.href, scat).subscribe(data => {
      this.onGetSubCategories(this.currentCategory);
      this.mode = '';
    }, err => {
      console.log(err);
    });
  }

  onDeleteSubCat(scat) {
    const url = scat._links.self.href;
    const c = confirm('Etes vous sure de supprimer?');
    if (!c) {return; }
    this.catService.delete(url).subscribe(data => {
      this.onGetSubCategories(this.currentCategory);
    }, err => {
      console.log(err);
    });
  }


  ajouterCat() {
    this.mode = 'new-cat';
    this.subCatgories = null;
  }
}
