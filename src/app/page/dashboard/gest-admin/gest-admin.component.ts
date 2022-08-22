import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-gest-admin',
  templateUrl: './gest-admin.component.html',
  styleUrls: ['./gest-admin.component.scss']
})
export class GestAdminComponent implements OnInit {
  private users: any [];
  private admins;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.onGetAllUsers();
    this.onGetAllAdmin();
  }

  onGetAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data._embedded.utilisateurs ;
      this.users = this.users.filter(value =>  value.roles.length === 1 );
    }, err => {
      console.log(err);
    });
  }


  onDelete(u) {
    const c = confirm('Etes vous sure de supprimmer?');
    if (!c) {return; }
    this.userService.deleteUser(u._links.self.href).subscribe(data => {
      this.onGetAllUsers() ;
      this.onGetAllAdmin();
    }, error => {
      console.log(error);
    });
  }


  onAddAdmin(u) {
    this.userService.ajouterAdmin(u.username).subscribe(data => {
      this.onGetAllUsers() ;
      this.onGetAllAdmin();
    }, err => {
      console.log(err);
    });
  }

  // <---------- Methodes for ADMIN ---------------->

  onGetAllAdmin() {
    this.userService.getAllAdmin().subscribe(data => {
      this.admins = data._embedded.utilisateurs ;
      this.admins = this.admins.filter(value =>  value.roles.length === 2 );
    }, err => {
      console.log(err);
    });
  }

  onRemoveAdmin(u) {
    u.roles.pop('ADMIN');
    this.userService.retirerAdmin(u._links.self.href, u).subscribe(data => {
      this.onGetAllAdmin();
      this.onGetAllUsers() ;

    }, err => {
      console.log(err);
    });
  }



}
