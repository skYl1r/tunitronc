import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {GestionService} from '../../../service/gestion.service';
import {AuthenticationService} from '../../../service/authentication.service';

declare var $: any;

@Component({
  selector: 'app-gest-abonne',
  templateUrl: './gest-abonne.component.html',
  styleUrls: ['./gest-abonne.component.scss']
})
export class GestAbonneComponent implements OnInit {

  private users: any [];
  private username;
  private cause;
  private gestion;
  private isSuperAdmin;
  private show = false;

  constructor(private userService: UserService,
              private gestionService: GestionService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.onGetAllUsers();
    this.onGetAllGestionAbonne();
  }


  // <---------- Methodes for User(Abonne) ---------------->

  onGetAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data._embedded.utilisateurs;
      this.users = this.users.filter(value => value.roles.length === 1);
    });
  }

  consulteProfil(username: any) {
    this.router.navigate(['/profil', username]);
  }


  onDelete(u) {
    const c = confirm('Etes vous sure?');
    if (!c) {
      return;
    }
    this.userService.deleteUser(u._links.self.href).subscribe(data => {
      this.onGetAllUsers();
    }, error => {
      console.log(error);
    });
  }


  onBlock(username: any) {
    this.username = username;
    $('#bloquerModal').modal('show');
  }

  envoyerBloquerModal(cause): void {
    if (cause) {
      this.userService.bloquer(this.username, cause).subscribe(data => {
        this.onGetAllUsers();
      });
    }
    this.hideBloquerModal();
  }

  hideBloquerModal(): void {
    document.getElementById('close-bloquerModal').click();
  }


  onDeblock(username: any) {
    this.username = username;
    $('#debloquerModal').modal('show');
  }

  envoyerDebloquerModal(cause): void {
    if (cause) {
      this.userService.debloquer(this.username, cause).subscribe(data => {
        this.onGetAllUsers();
      });
    }
    this.hideDebloquerModal();
  }

  hideDebloquerModal(): void {
    document.getElementById('close-debloquerModal').click();
  }

  onSupprimer(username: any) {
    this.username = username;
    $('#supprimerModal').modal('show');
  }

  envoyerSupprimerModal(cause): void {
    if (cause) {
      this.userService.supprimer(this.username, cause).subscribe(data => {
        this.onGetAllUsers();
      });
    }
    this.hideSupprimerModal();
  }

  hideSupprimerModal(): void {
    document.getElementById('close-supprimerModal').click();
  }


// historique gestion Abonne

  onGetAllGestionAbonne() {
    this.gestionService.getAllGestionAbonne().subscribe(data => {
      this.gestion = data._embedded.gestionAbonnes;
    });
  }


  showit() {
    this.show = !this.show;
  }
}
