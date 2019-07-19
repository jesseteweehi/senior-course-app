import { CourseDialogComponent, StandardDialogComponent } from './../forms/allcourses-forms/allcourses-forms.component';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course, Standard } from '../../global/classes';
import { CoursesService } from '../../courses.service';
import { publishReplay, refCount, filter } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  CourseDialogRef: MatDialogRef<CourseDialogComponent>;
  StandardDialogRef: MatDialogRef<StandardDialogComponent>;

  courseid: string;
  useruid: string;

  showform = false;
  course$: Observable<Course>;
  standards$: Observable<Standard[]>;


  form: FormGroup;
  formstandard: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cs: CoursesService,
    private auth: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
      this.auth.user()
        .subscribe(user => {
          this.useruid = user.uid;
        });
      this.courseid = this.route.snapshot.params.courseid;
      this.course$ = this.cs.readdoc$('courses', this.courseid).pipe(
        publishReplay(10),
        refCount()
      );
      this.standards$ = this.cs.readcollection$(`courses/${this.courseid}/standards`);
    }

  ngOnInit() {}

  addCourse(courseid: string, uid: string) {
    this.cs.createWithJustId(`users/${this.useruid}/mycourses`, courseid );
  }

  add(course: Course) {
    console.log(course);
    this.CourseDialogRef = this.dialog.open(CourseDialogComponent, {
      width: '100%',
      data: {
        currentFormValues: course
      }
    });
    this.CourseDialogRef.afterClosed().pipe(
      filter(x => x !== undefined))
      .subscribe(x => {
        console.log(x);
        this.messagefromPromise(this.cs.update(`courses/${this.courseid}`, x.data.value), 'Course Updated')
        });
  }

  addStandard(standard: Standard) {
    console.log(standard);
    this.StandardDialogRef = this.dialog.open(StandardDialogComponent, {
      width: '100%',
      data: {
        currentFormValues: standard
      }
    });
    this.StandardDialogRef.afterClosed().pipe(
      filter(x => x !== undefined))
      .subscribe(x => {
        console.log(x);
        this.messagefromPromise(this.cs.update(`courses/${this.courseid}/standards/${standard.id}`, x.data.value), 'Standard Updated');
        });
  }

  messagefromPromise(data: Promise<any>, success = 'Success', error = 'Bugger') {
    data
      .then(_ => this.openSnackBar(success, 'Awesome'))
      .catch(err => this.openSnackBar(err, 'Bugger'));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
