import { Component, OnInit } from '@angular/core';
import {GestionService} from '../../../service/gestion.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  private reclamation;
  constructor(private gestionService: GestionService) { }

  ngOnInit() {
    this.getAllReclamationAnnnonce();
  }

  getAllReclamationAnnnonce() {
    this.gestionService.getAllAnnonceReclamation().subscribe( data => {
      this.reclamation = data._embedded.signalAnnonces;
    });

  }
}
