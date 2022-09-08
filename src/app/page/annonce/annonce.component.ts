import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnnonceService} from '../../service/annonce.service';
import {UserService} from '../../service/user.service';

declare var $: any;

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  private abonne;
  private deposeDate;
  private annonce;
  private user;
  private mesAnnonces;
  private cause;
  private favoris = false;

  constructor(private activatedRoute: ActivatedRoute,
              private annonceService: AnnonceService,
              private userService: UserService,
              private router: Router,
  ) {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      this.getAnnonce();
    });
  }


  ngOnInit() {
    this.getAnnonce();
    this.getUser();
  }


  getAnnonce() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.annonceService.getAnnonce(id).subscribe(data => {
      this.annonce = data;
      console.log(data);
      this.getAbonne(data.username);
      const x = this.annonce.datePublication;
      const date1 = new Date(x);
      const diffTime = Math.abs(Date.now() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffDays);
      this.deposeDate = diffDays - 1;
      this.isFavoris();
    }, err => {
      console.log(err);
    });

  }



  getAbonne(username) {
    this.userService.getUserByUsername(username).subscribe(user => {
      // console.log(user);
      this.abonne = user;
    }, err => {
      console.log(err);
    });
  }



  onSuggerer() {
    // this.username = username;
    $('#suggererModal').modal('show');
  }

  envoyerSuggererModal(cause): void {
    if (cause) {
      // this.userService.supprimer(this.username, cause).subscribe(data => {
      //   this.onGetAllUsers();
      // });
    }
    this.hideSuggererModal();
  }

  hideSuggererModal(): void {
    document.getElementById('close-suggererModal').click();
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.getMesAnnonces();
      console.log(user);
    });
  }

  getMesAnnonces() {
    this.annonceService.getAnnonceByUrl(this.user._links.annonces.href).subscribe(data => {
      this.mesAnnonces = data._embedded.annonces;
      console.log(this.mesAnnonces);
    });
  }

  selectSuggestion(sugg) {
      console.log(sugg);
    this.hideSuggererModal();
    this.annonce.suggestion.push(sugg);
    this.annonceService.suggererAnnonce(this.annonce).subscribe( data => {
          this.getAnnonce();
    });
  }
  OnCommenter(comm) {
    // console.log(comm);
    // console.log(this.annonce.id);
    // console.log(this.user.username);

    this.annonceService.commenter(this.annonce.id, comm, this.user.username).subscribe( data => {
      this.getAnnonce();
    });
  }

  handleFavoris(){
    if(this.favoris){
      this.supprimerFavoris();
    }else{
      this.ajouterFavoris();
    }
  }

  ajouterFavoris() {
    this.userService.ajouterFavoris(this.annonce.id).subscribe( data => {
      this.favoris = true;
    });
  }

  supprimerFavoris() {
    this.userService.supprimerFavoris(this.annonce.id).subscribe( data => {
      this.favoris = false;
    });
  }
  
  isFavoris() {
    this.userService.isFavoris(this.annonce.id).subscribe( data => {
      if(data === true)
        this.favoris = true;
      else
        this.favoris = false;
    },
    error => {
      this.favoris = false;
      console.log(error);
    });
  }

  onSignaler() {
    $('#signalerAnnonceModal').modal('show');
  }

  envoyerSignaleModal(cause): void {
    if (cause) {
      this.annonceService.signalerAnnonce(this.annonce.id, cause, this.user.username).subscribe(data => {
      });
    }
    this.hideSignaleModal();
  }

  hideSignaleModal(): void {
    document.getElementById('close-signalerAnnonceModal').click();
  }

}
