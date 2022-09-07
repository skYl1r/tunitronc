import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnonceService} from '../../service/annonce.service';
import { AlertService } from 'src/app/service/alert.service';
import { User } from 'src/app/model/user';
import { Gouvernorat } from 'src/app/model/gouvernorat';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  private user;
  private profileForm: FormGroup;
  private submitted = false;
  private loading = false;
  private annonces;
  private gov = Gouvernorat.gov;
  private ville;


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private annonceService: AnnonceService,
              private alertService: AlertService
  ) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  ngOnInit() {
    this.getUser();
    this.profileForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
      rue: [''],
      gouvernorat: [''],
      ville: ['']
    });

  }

  onSubmit() {
    this.submitted = true;



    if (this.profileForm.invalid) {
      return;
    }
this

    this.loading = true;
    const user: User = {
      id: this.user.id,
      prenom: this.profileForm.controls.prenom.value,
      nom: this.profileForm.controls.nom.value,
      email: this.profileForm.controls.email.value,
      password: this.profileForm.controls.password.value,
      adresse: this.profileForm.controls.rue.value + ', ' +  this.profileForm.controls.ville.value + ', '
        + this.profileForm.controls.gouvernorat.value
    };

    console.log('++++++++++++++++++++++',user)
    this.userService.updateUser(user).subscribe(
        data => {
          this.alertService.success('Profile Modifié', true);
          this.loading = false;
        },
        error => {
          this.alertService.error('une erreur s\'est produite');
          this.loading = false;
        });
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.getMyAnnonce();
      console.log(user);
      this.profileForm.patchValue({
        nom: `${this.user.nom}`,
        prenom: `${this.user.prenom}`,
        email: `${this.user.email}`
      });
    });
  }

  getMyAnnonce() {
    this.annonceService.getAnnonceByUrl(this.user._links.annonces.href).subscribe(data => {
      this.annonces = data._embedded.annonces;
      console.log(this.annonces);
    });
  }

  getVille(e) {
    const gov = e.target.value ;
    this.ville = this.gov.filter(value =>  value.name === gov )[0].villes;
  }
}



