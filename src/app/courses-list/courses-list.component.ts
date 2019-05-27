import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Course } from './../global/classes';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courseid: string;
  private courseDoc: AngularFirestoreDocument<Course>;
  course: Observable<Course>;



  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute
    ) {
      this.courseid = this.route.snapshot.params.courseid;
      this.courseDoc = this.afs.doc<Course>(`course/${this.courseid}`);
      this.course = this.courseDoc.valueChanges();
    }

  ngOnInit() {
   
  }

}
