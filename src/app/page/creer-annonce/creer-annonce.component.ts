import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {AnnonceService} from '../../service/annonce.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Gouvernorat} from '../../model/gouvernorat';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.scss']
})
export class CreerAnnonceComponent implements OnInit {

  private annonceForm: FormGroup;
  private submitted = false;
  private message;
  private imagePath;
  private imgURL1: any;
  private imgURL2: any;
  private imgURL3: any;
  private ville;
  private catgories ;
  private subCatgories: any;
  private annonce ;
  private images: [string];
  private showLocation = false;
  private showEchange = false;
  private gov = Gouvernorat.gov ;


constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private catService: CategoryService,
    private annonceService: AnnonceService,
    private authService: AuthenticationService,
  ) {}


  ngOnInit() {
    this.getCategories();
    this.annonceForm = this.formBuilder.group({
      username: this.authService.getUsername(),
      image1: [],
      image2: [],
      image3: [],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      sousCategorie: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      ville: ['', Validators.required],
      prix: [],
      duree: [],

    });

  }

  get f() {
    return this.annonceForm.controls;
  }


  onSaveAnnonnce() {
    this.submitted = true;
    if (this.annonceForm.invalid )  {
      console.log('error');
      return;
    }
    if (!this.annonceForm.value.image1 && !this.annonceForm.value.image2 && !this.annonceForm.value.image2 ) {
      console.log('imgerr');
      return;
    }

    console.log(this.annonceForm.value);

    this.annonceService.saveAnnonce(this.annonceForm.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/annonces', data.id]);
      },
      error => {
        console.log(error);
      });

  }




  getCategories() {
    this.catService.getAllCategories().subscribe(data => {
      this.catgories = data._embedded.categories ;
    }, err => {
      console.log(err);
    });
  }

  getSubCategories(cat) {
  let link ;
  this.catService.getSubCategoriesByCategory(cat).subscribe(data => {
    // console.log(data._links.subCategories.href );
    link = data._links.sousCategories.href ;
    this.catService.getSubCategories(link).subscribe(scat => {
      this.subCatgories = scat._embedded.sousCategories ;
    });
  });
  }

  getVille(e) {
  const gov = e.target.value ;
  this.ville = this.gov.filter(value =>  value.name === gov );
  this.ville.forEach(v => { this.ville = v.villes; });
  }



  preview1(files) {
    if (files.length === 0) {
      return;
    }
    const currentFileUpload = files.item(0);
    const fileReader = new FileReader();
    fileReader.onload = this._handleReaderLoaded.bind(this);
    fileReader.readAsBinaryString(currentFileUpload);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    const filestring = btoa(binaryString);  // Converting binary string data.
    this.annonceForm.patchValue({
      image1: filestring ,
    });
    this.imgURL1 = filestring ;
  }


  preview2(files) {
    if (files.length === 0) {
      return;
    }
    const currentFileUpload = files.item(0);
    const fileReader = new FileReader();
    fileReader.onload = this._handleReaderLoaded2.bind(this);
    fileReader.readAsBinaryString(currentFileUpload);
  }
  _handleReaderLoaded2(readerEvt) {
    const binaryString = readerEvt.target.result;
    const filestring = btoa(binaryString);  // Converting binary string data.
    this.annonceForm.patchValue({
      image2: filestring ,
    });
    this.imgURL2 = filestring ;
  }

  preview3(files) {
    if (files.length === 0) {
      return;
    }
    const currentFileUpload = files.item(0);
    const fileReader = new FileReader();
    fileReader.onload = this._handleReaderLoaded3.bind(this);
    fileReader.readAsBinaryString(currentFileUpload);
  }
  _handleReaderLoaded3(readerEvt) {
    const binaryString = readerEvt.target.result;
    const filestring = btoa(binaryString);  // Converting binary string data.
    this.annonceForm.patchValue({
      image3: filestring ,
    });
    this.imgURL3 = filestring ;
  }

  onShowEchange(event) {
   this.showEchange = !this.showEchange;
  }


  onShowLocation(event) {
    this.showLocation = !this.showLocation;
  }
}
