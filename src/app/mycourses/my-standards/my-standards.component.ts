import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { CoursesService } from './../../courses.service';
import { Component, OnInit } from '@angular/core';
import { MyStandard } from 'src/app/global/classes';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-my-standards',
  templateUrl: './my-standards.component.html',
  styleUrls: ['./my-standards.component.css']
})
export class MyStandardsComponent implements OnInit {
  selected = 'null';

  standardsJoined$: Observable<MyStandard[]>;
  userid: string;

  constructor(private cs: CoursesService,
              private route: ActivatedRoute,
              ) { this.userid = this.route.snapshot.params.userid; }

  ngOnInit() {
    const myStandards$ = this.cs.readcollectionsAllStandards(`users/${this.userid}/mystandards`);
    const myStandardResult$ = this.cs.readcollection$(`users/${this.userid}/mystandards`);
    this.standardsJoined$ = combineLatest(myStandards$, myStandardResult$).pipe(
        map(result1 => {
          console.log(result1);
          const myStandards = result1[0];
          const myStandardResult = result1[1];
          const standardsJoined = [];
          myStandardResult.map(r => {
                const id = r.identifier;
                const ob = myStandards.find(obj => obj.id === id );
                standardsJoined.push(Object.assign(ob, { result : r.result }));
          });
          console.log(standardsJoined);
          return standardsJoined;
        }),
      );
  }

}
