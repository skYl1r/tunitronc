import {Component, Input, OnInit} from '@angular/core';
import {AnnonceService} from '../../service/annonce.service';

@Component({
  selector: 'app-suggestion-card',
  templateUrl: './suggestion-card.component.html',
  styleUrls: ['./suggestion-card.component.scss']
})
export class SuggestionCardComponent implements OnInit {


  @Input() id;
  private annonce;

  constructor(private annonceService: AnnonceService,
  ) {

  }

  ngOnInit() {
    this.getAnnonce();

  }

  getAnnonce() {
    this.annonceService.getAnnonce(this.id).subscribe(data => {
      this.annonce = data;
    });
  }
}
