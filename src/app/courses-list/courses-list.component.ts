import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from './../global/classes';
import { CoursesService } from './../courses.service';



@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  private courseDoc: AngularFirestoreDocument<Course>;
  course$: Observable<any>;



  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private cs: CoursesService
    ) {
      const courseid = this.route.snapshot.params.courseid;
      this.course$ = this.cs.readdoc$('course', courseid);
      // this.courseDoc = this.afs.doc<Course>(`course/${this.courseid}`);
      // this.course = this.courseDoc.valueChanges();
    }

  ngOnInit() {
  }

}
