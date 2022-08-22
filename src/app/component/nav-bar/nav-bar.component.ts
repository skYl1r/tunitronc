import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
  ) { }

  ngOnInit() {
  }


  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  isUser() {
    return this.authenticationService.isUser();
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }


  logout() {
    this.authenticationService.logout();
  }

  rechercher(motcle) {
    // console.log(motcle);
    this.router.navigate(['/recherche/' + motcle]);
  }
}
