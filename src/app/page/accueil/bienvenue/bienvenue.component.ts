import { Component, OnInit } from '@angular/core';
import {AnnonceService} from '../../../service/annonce.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit {
  private annonces;

  constructor(private annonceService: AnnonceService,

  ) { }

  ngOnInit() {
    this.getAllAnnonce();

  }

  getAllAnnonce() {
    this.annonceService.getAllAnnonce().subscribe(data => {
      this.annonces = data._embedded.annonces;
    });
  }

}
