import {Component, OnInit} from '@angular/core';
import {Gouvernorat} from '../../model/gouvernorat';
import {CategoryService} from '../../service/category.service';
import {AnnonceService} from '../../service/annonce.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  private gov = Gouvernorat.gov;
  private ville;
  private categories;
  private subCatgories;
  private annonces;
  private allAnnonce;
  private annoncesAlaUne;
  private currentGov;
  private currentVille;
  private currentCategorie;
  private currentSubCatgorie;
  private result = false;
  private recherche = false;
  private motCle;

  private balise = ['<i class="fas fa-book"></i>', '<i class="fas fa-tools"></i>', '<i class="fas fa-car"></i>',
    '<i class="fas fa-tshirt"></i>', '<i class="fas fa-futbol"></i>', '<i class="fas fa-hands-helping"></i>'];


  constructor(private catService: CategoryService,
              private annonceService: AnnonceService,
              private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.motCle = this.route.snapshot.paramMap.get('motCle');
      if (this.motCle) {
        this.recherche = true;
        this.getAnnonceByMotCle();
        console.log(this.motCle);
      }
    });
  }

  ngOnInit() {
    this.getCategories();

  }


  // ANNONCES
  getAnnonces() {
    if (this.currentGov) {
      if (this.currentVille) {
        this.annonceService.getAnnonces(this.currentVille, this.currentCategorie, this.currentSubCatgorie);
      } else {
        this.annonceService.getAnnonces2(this.currentGov, this.currentCategorie, this.currentSubCatgorie);
      }
    } else {
      this.annonceService.getAnnonces3(this.currentCategorie, this.currentSubCatgorie);
    }
  }


  getAnnonceByMotCle() {
    this.annonceService.getAnnonceByMotCle(this.motCle).subscribe(data => {
      this.annonces = data;
      // console.log(data);
    });
  }


  getAnnoncesByGovenorat(gov) {
    this.result = true;
    this.annonceService.getAnnoncesByGovenorat(gov).subscribe( data => {
      this.annonces = data._embedded.annonces;
      console.log(data._embedded.annonces);
    });
  }



  getByCategorie(cat) {
    this.annonceService.getAnnonceByCategorie(cat).subscribe(data => {
      this.annonces = data._embedded.annonces;
      // console.log(data);
    });
  }


  getAnnoncesBySousCategorie(scat) {
    this.result = true;
    this.currentSubCatgorie = scat;
    // this.getAnnonces();
    this.catService.getSubCategoriesByName(scat).subscribe(souscat => {
      this.getAnnoncesSC(souscat);
      // console.log(scat);

    });
  }

  getAnnoncesSC(scat) {
    const url = scat._links.annonces.href;
    this.annonceService.getAnnonceByUrl(url).subscribe(data => {
      this.annonces = data._embedded.annonces;
      console.log(data);

    });
  }


  changeVille(e) {
    this.currentVille = e.target.value;
    this.getAnnonces();
  }

  getVille(e) {
    this.currentGov = e.target.value;
    this.getAnnoncesByGovenorat(this.currentGov);
    this.ville = this.gov.filter(value => value.name === this.currentGov);
    this.ville.forEach(v => {
      this.ville = v.villes;
    });
  }


  getAnnonceBySousCategorie(url) {
    this.annonceService.getAnnonceBySousCategorie(url);
  }


  filterAnnoncesByGouvernorat(event) {
    const gov = event.target.value;
    this.annonces = this.annonces.filter(value => value.gouvernorat === gov);
  }

  filterAnnoncesByVille(event) {
    const gov = event.target.value;
    this.annonces = this.annonces.filter(value => value.ville === gov);
  }

  getCategories() {
    this.catService.getAllCategories().subscribe(data => {
      this.categories = data._embedded.categories;
    }, err => {
      console.log(err);
    });
  }

  getSubCategories(cat) {
    this.result = true;
    this.currentCategorie = cat.nom;
    this.getByCategorie(cat.nom);
    console.log(cat.nom);
    const link = cat._links.sousCategories.href;
    this.catService.getSubCategories(link).subscribe(scat => {
      this.subCatgories = scat._embedded.sousCategories;
      // console.log(this.subCatgories);
    });
  }
}
