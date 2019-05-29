import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from './../global/classes';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesCollectionRef: AngularFirestoreCollection<Course>;
  course$: Observable<Course[]>;

  form: FormGroup;


  constructor(private fb: FormBuilder,
              private afs: AngularFirestore
              ) {
                this.coursesCollectionRef = afs.collection<Course>('course');
                this.course$ = this.coursesCollectionRef.snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Course;
                    const id = a.payload.doc.id;
                    return{id, ...data};
                  })));
              }

  ngOnInit() {
    this.form = this.fb.group({
      date_created: ['', Validators.required],
      date_updated: ['', Validators.required],
      title: ['', Validators.required],
      year_level: ['', Validators.required],
      subject_code: ['', Validators.required],
      teacher_in_charge: ['', Validators.required],
      course_endorsable: ['', Validators.required],
      course_information: ['', Validators.required],
      faculty: ['', Validators.required]

    });
  }

  save() {
    console.log(this.form.value.title);
    this.addItem(this.form.value);
  }

  addItem(item: Course) {
    console.log(item);
    this.coursesCollectionRef.add(item);
  }

}
