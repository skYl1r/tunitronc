import {Component, OnInit} from '@angular/core';
import {AnnonceService} from '../../../service/annonce.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication.service';
import {GestionService} from '../../../service/gestion.service';

declare var $: any;

@Component({
  selector: 'app-gest-annonce',
  templateUrl: './gest-annonce.component.html',
  styleUrls: ['./gest-annonce.component.scss']
})
export class GestAnnonceComponent implements OnInit {

  private annonces;
  private isSuperAdmin;
  private gestion;
  private annonce;
  private show = false;

  constructor(private annonceService: AnnonceService,
              private authService: AuthenticationService,
              private gestAnnonce: GestionService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.getAllAnnonces();
    this.onGetAllGestionAnnonce();

  }


  getAllAnnonces() {
    this.annonceService.getAllAnnonce().subscribe(data => {
      this.annonces = data._embedded.annonces;
      console.log(data._embedded.annonces);

    }, err => {
      console.log(err);
    });
  }

  consulter(id) {
    this.router.navigate(['/annonces', id]);
  }

  private onGetAllGestionAnnonce() {
    this.gestAnnonce.getAllGestionAnnonce().subscribe(data => {
      this.gestion = data._embedded.gestionAnnonces;
    });
  }

  onSupprimer(annonce: any) {
    this.annonce = annonce;
    if (this.authService.isSuperAdmin()) {
      this.annonceService.deleteAnnonceURL(annonce._links.self.href).subscribe( data => {
        this.getAllAnnonces();
      });
      console.log(annonce);
    } else {
      console.log('non supprimer');
      this.annonce = annonce.id;
      $('#supprimerAnnonceModal').modal('show');
    }
  }

  envoyerSupprimerModal(cause): void {
    if (cause) {
      this.annonceService.supprimer(this.annonce, cause).subscribe(data => {
        this.getAllAnnonces();
      });
    }
    this.hideSupprimerModal();
  }

  hideSupprimerModal(): void {
    document.getElementById('close-supprimerAnnonceModal').click();
  }

  showit() {
    this.show = !this.show;
  }

}
