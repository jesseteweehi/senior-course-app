import { publishReplay, refCount, shareReplay, takeUntil } from 'rxjs/operators';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Standard, StandardResult } from './../../global/classes';
import { Course } from 'src/app/global/classes';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../../courses.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-my-course-action',
  templateUrl: './my-course-action.component.html',
  styleUrls: ['./my-course-action.component.css']
})
export class MyCourseActionComponent implements OnInit {
  @Input() course$: Observable<Course>;
  courseid: string;
  userid: string;
  standards$: Observable<Standard[]>;
  mystandards: string[];



  constructor(
    private route: ActivatedRoute,
    private cs: CoursesService
  ) {
    this.courseid = this.route.snapshot.params.courseid;
    this.userid = this.route.snapshot.params.userid;
    this.standards$ = this.cs.readcollection$(`courses/${this.courseid}/standards`)
  }

  ngOnInit() {
  }

  addStandard(id: string, value: string) {
    console.log(id, value);
    const result = { identifier: id, courseid: this.courseid, result: value} as StandardResult;
    this.cs.createWithId(`users/${this.userid}/mystandards`, id, result);
  }

  removeStandard(id: string) {
    this.cs.remove(`users/${this.userid}/mystandards`, id);
  }
}
