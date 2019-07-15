import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course, User } from './../global/classes';
import { CoursesService } from '../courses.service';
import { AuthService } from './../auth.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  showform = false;
  courses$: Observable<Course[]>;
  form: FormGroup;
  useruid: string;

  constructor(private fb: FormBuilder,
              private cs: CoursesService,
              private auth: AuthService) {
    this.courses$ = this.cs.readcollection$('courses');
    this.auth.user()
        .subscribe(user => {
          this.useruid = user.uid;
        });
    }

    ngOnInit() {
      this.form = this.fb.group({
        date_created: ['', Validators.required],
        date_updated: ['', Validators.required],
        subject_name: ['', Validators.required],
        year_level: ['', Validators.required],
        subject_code: ['', Validators.required],
        teacher_in_charge: ['', Validators.required],
        course_endorsable: ['', Validators.required],
        course_information: ['', Validators.required],
        faculty: ['', Validators.required]
      });
    }
    save() {
      this.showform = false;
      this.addItem(this.form.value);
    }
    addItem(item: Course) {
      this.cs.create('courses', item);
    }
    show() {
      this.showform = true;
    }
    remove(id: string) {
      this.cs.remove('courses', id);
    }

    addCourse(courseid: string, uid: string) {
      this.cs.createWithJustId(`users/${this.useruid}/mycourses`, courseid );
    }

    // customclaims() {
    //   return this.as.customclaims;
    // }

}
