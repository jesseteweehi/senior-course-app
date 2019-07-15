import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './../../courses.service';
import { Standard, Course, StandardResult, MyStandard } from './../../global/classes';
import { Observable, Subject, combineLatest, of, from, BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { map, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-course-dashboard',
  templateUrl: './my-course-dashboard.component.html',
  styleUrls: ['./my-course-dashboard.component.css']
})
export class MyCourseDashboardComponent implements OnInit {
  @Input() course$: Observable<Course>;
  standardsJoined$: Observable<any[]>;
  standardsLeft$: Observable<MyStandard[]>;
  standardsNotAchieved$: Observable<MyStandard[]>;
  standardsAchieved$: Observable<MyStandard[]>;
  standardsMerit$: Observable<MyStandard[]>;
  standardsExcellence$: Observable<MyStandard[]>;
  courseid: string;
  userid: string;

  constructor(private cs: CoursesService,
              private route: ActivatedRoute) {
                this.courseid = this.route.snapshot.params.courseid;
                this.userid = this.route.snapshot.params.userid;
              }

  ngOnInit() {
    const myStandardResult$ = this.cs.querycollection$(`users/${this.userid}/mystandards`, 'courseid', '==', this.courseid);
    const myStandards$ = this.cs.querycollection$(`users/${this.userid}/mystandards`, 'courseid', '==', this.courseid).pipe(
      map(x => {
        if (x === undefined) {
            return [];
        } else {
            return x;
        }}),
      map(observ => observ.map(key => this.cs.readdoc$(`courses/${this.courseid}/standards`, key.identifier))),
      mergeMap(item => combineLatest(item)),
      );
    this.standardsJoined$ = combineLatest(myStandards$, myStandardResult$).pipe(
            map(result1 => {
              const myStandards = result1[0];
              const myStandardResult = result1[1];
              const standardsJoined = [];
              myStandardResult.map(r => {
                    const id = r.identifier;
                    // if (myStandards.some(obj => obj.courseid === this.courseid && (r.courseid = this.courseid))) {
                    const ob = myStandards.find(obj => obj.id === id );
                    standardsJoined.push(Object.assign(ob, { result : r.result }));
                    });
              return standardsJoined;
            }),
          );

    // this.standardsLeft$ = this.standardsJoined$.pipe(
    //   map(array => array.filter(obj => obj.result === 'Not yet assessed')));
    // this.standardsNotAchieved$ = this.standardsJoined$.pipe(
    //   map(array => array.filter(obj => obj.result === 'Not achieved')));
    // this.standardsAchieved$ = this.standardsJoined$.pipe(
    //   map(array => array.filter(obj => obj.result === 'Achieved')));
    // this.standardsMerit$ = this.standardsJoined$.pipe(
    //   map(array => array.filter(obj => obj.result === 'Achieved with Merit')));
    // this.standardsExcellence$ = this.standardsJoined$.pipe(
    //   map(array => array.filter(obj => obj.result === 'Achieved with Excellence')));
  }
}

