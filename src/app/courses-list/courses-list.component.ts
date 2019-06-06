import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from './../global/classes';
import { CoursesService } from '../courses.service';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private cs: CoursesService) {
    this.courses$ = this.cs.readcollection$('course');
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
      this.addItem(this.form.value);
    }
    addItem(item: Course) {
      this.cs.create('course', item);
    }

}
