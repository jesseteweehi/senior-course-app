import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  userid: string;
  mycourses$: Observable<any[]>;

  constructor(private cs: CoursesService,
              private route: ActivatedRoute) {
              this.userid = this.route.snapshot.params.userid;
              }

  ngOnInit() {
    this.mycourses$ = this.cs.readcollectionsdifferentpaths(`users/${this.userid}/mycourses`, 'courses');
  }
}
