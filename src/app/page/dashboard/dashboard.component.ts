import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private isSuperAdmin;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  this.isSuperAdmin = this.authService.isSuperAdmin();
  }

}
