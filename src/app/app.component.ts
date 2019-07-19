import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'senior-courses-app';
  useruid: string;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.user().subscribe(user => this.useruid = user.uid);
  }


  login() {
    this.auth.login();
  }
}
