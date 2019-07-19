import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course, User } from '../../global/classes';
import { CoursesService } from '../../courses.service';
import { AuthService } from '../../auth.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  showform = false;
  form: FormGroup;
  useruid: string;
  // Filtering
  fullCourses: Course[];
  filteredCourses: Course[];
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    console.log(value);
    this._searchTerm = value;
    if (value === '') {
      this.filteredCourses = this.fullCourses;
    } else {
      this.filteredCourses = this.filtereCourses(value);
    }
  }

  filtereCourses(searchString: string) {
    return this.fullCourses.filter(course =>
      course.subject_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private fb: FormBuilder,
              private cs: CoursesService) {
    this.cs.readcollection$('courses').subscribe(courses => this.fullCourses = this.filteredCourses = courses);
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
 
}
