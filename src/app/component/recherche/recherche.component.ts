import { Component, OnInit } from '@angular/core';
import {Gouvernorat} from '../../model/gouvernorat';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  private gov = Gouvernorat.gov ;
  private ville;

  constructor() { }

  ngOnInit() {
  }



  getVille(e) {
    const gov = e.target.value ;
    this.ville = this.gov.filter(value =>  value.name === gov );
    this.ville.forEach(v => { this.ville = v.villes; });
  }

}
