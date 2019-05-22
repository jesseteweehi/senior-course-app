import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Course {
  date_created: string;
  date_updated: string;
  title: string;
  year_level: string;
  subject_code: string;
  teacher_in_charge: string;
  course_endorsable: string;
  course_information: string;
  faculty: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  private coursesCollection: AngularFirestoreCollection<Course>;
  courses: Observable<Course[]>;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore
              ) {
                this.coursesCollection = afs.collection<Course>('course');
                this.courses = this.coursesCollection.valueChanges();
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
    this.coursesCollection.add(item);
  }

}
