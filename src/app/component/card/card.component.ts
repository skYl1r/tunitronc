import {Component, Input, OnInit} from '@angular/core';
import {AnnonceService} from '../../service/annonce.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() id;
  private annonce;
  constructor(private annonceService: AnnonceService,
  ) {

  }

  ngOnInit() {
    this.getAnnonce();

  }

getAnnonce() {
    this.annonceService.getAnnonce(this.id).subscribe( data =>{
      this.annonce = data;
    });
}

}
