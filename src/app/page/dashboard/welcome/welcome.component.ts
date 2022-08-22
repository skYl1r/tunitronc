import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  username;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

}
