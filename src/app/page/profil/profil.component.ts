import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {AnnonceService} from '../../service/annonce.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  private user;
  private annonces ;


  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private annonceService: AnnonceService,
  ) {
  }

  ngOnInit() {
    this.getAbonne();
  }


  getAbonne() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUserByUsername(username).subscribe(user => {
      this.user = user;
      this.getAnnonce();
    }, err => {
      console.log(err);
    });
  }
  getAnnonce() {
    this.annonceService.getAnnonceByUrl(this.user._links.annonces.href).subscribe(data => {
      this.annonces = data._embedded.annonces;
      console.log(this.annonces);
    });

  }

}
