import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from './global/classes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'senior-courses-app';

  constructor(private auth: AuthService) {}

  user: Observable<User>;

  ngOnInit() {
  }

  login() {
    console.log('yep');
    this.auth.login();
  }




}
