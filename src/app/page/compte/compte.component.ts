import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnonceService} from '../../service/annonce.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

  private user;
  private registerForm: FormGroup;
  private submitted = false;
  private annonces;


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private annonceService: AnnonceService,
  ) {
  }

  ngOnInit() {
    this.getUser();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.getMyAnnonce();
      console.log(user);
    });
  }

  getMyAnnonce() {
    this.annonceService.getAnnonceByUrl(this.user._links.annonces.href).subscribe(data => {
      this.annonces = data._embedded.annonces;
      console.log(this.annonces);
    });
  }

}



