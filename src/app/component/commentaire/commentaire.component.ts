import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  @Input() commentaire;

  constructor() { }

  ngOnInit() {
  }

}
