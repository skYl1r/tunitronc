import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnnonceService} from '../../../service/annonce.service';
import {CategoryService} from '../../../service/category.service';

@Component({
  selector: 'app-resultats2',
  templateUrl: './resultats2.component.html',
  styleUrls: ['./resultats2.component.scss']
})
export class Resultats2Component implements OnInit {

 @Input() annonces;
 @Input() motCle;

  constructor(private activatedRoute: ActivatedRoute,
              private annonceService: AnnonceService,
              private catService: CategoryService,
  ) {}

  ngOnInit() {
  }




}
