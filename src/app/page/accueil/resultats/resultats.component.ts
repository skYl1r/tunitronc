import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnnonceService} from '../../../service/annonce.service';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent implements OnInit {

@Input() annonces;

  constructor(private activatedRoute: ActivatedRoute,
              private annonceService: AnnonceService,
              private catService: CategoryService,
  ) {
    // this.activatedRoute.params.subscribe(params => {
    //   console.log(params);
    //   this.getAnnonceBySousCategorie();
    // });
  }

  ngOnInit() {
  }


  // getAnnonceBySousCategorie() {
  //   const sousCat = this.activatedRoute.snapshot.paramMap.get('scat');
  //   this.catService.getSubCategoriesByName(sousCat).subscribe( scat => {
  //     this.getAnnonces(scat);
  //     // console.log(scat);
  //
  //   });
  // }

  // getAnnonces(scat) {
  //   const url = scat._links.annonces.href;
  //   this.annonceService.getAnnonceByUrl(url).subscribe( data => {
  //     this.annonces = data._embedded.annonces;
  //     console.log(data);
  //
  //   });
  // }
}
