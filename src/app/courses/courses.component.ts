import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from './../global/classes';
import { CoursesService } from '../courses.service';
import { publishReplay, refCount } from 'rxjs/operators';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private cs: CoursesService
    ) {
      const courseid = this.route.snapshot.params.courseid;
      this.course$ = this.cs.readdoc$('course', courseid).pipe(
        publishReplay(10),
        refCount()
      );
    }

  ngOnInit() {}
}
