import { Course } from './../../global/classes';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../../courses.service';
import { Component, OnInit } from '@angular/core';
import { publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'app-my-course-wrapper',
  templateUrl: './my-course-wrapper.component.html',
  styleUrls: ['./my-course-wrapper.component.css']
})
export class MyCourseWrapperComponent implements OnInit {
  courseid: string;
  course$: Observable<Course>;

  constructor(private cs: CoursesService,
              private route: ActivatedRoute) {
    this.courseid = this.route.snapshot.params.courseid;
    this.course$ = this.cs.readdoc$('courses', this.courseid).pipe(
      publishReplay(10),
      refCount()
    );
  }

  ngOnInit() {
  }

}
