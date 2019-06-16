import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course, Standard } from './../global/classes';
import { CoursesService } from '../courses.service';
import { publishReplay, refCount } from 'rxjs/operators';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  showform = false;
  course$: Observable<Course>;
  standards$: Observable<Standard[]>;
  courseid: string;

  form: FormGroup;
  formstandard: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cs: CoursesService
    ) {
      this.courseid = this.route.snapshot.params.courseid;
      this.course$ = this.cs.readdoc$('courses', this.courseid).pipe(
        publishReplay(10),
        refCount()
      );
      this.standards$ = this.cs.readcollection$(`courses/${this.courseid}/standards`);
    }

  ngOnInit() {
    this.form = this.fb.group({
      standardtype: ['Achievement', Validators.required],
      assessmenttype: ['Internal', Validators.required],
      assessment_method: ['', Validators.required],
      further_assessment: ['', Validators.required],
      approximate_date_due: ['', Validators.required],
      standardno: ['', Validators.required],
      version: ['', Validators.required],
      level: ['1', Validators.required],
      credits: ['', Validators.required],
      title: ['', Validators.required],
      literacy_numeracy: ['NA', Validators.required],
      completion: ['Term 4', Validators.required]
    });

    this.formstandard = this.fb.group({
      title: ['', Validators.required],
    });
  }
  show() {
    this.showform = true;
  }
  save() {
    this.showform = false;
    this.addItem(this.form.value);
    this.form.reset();
  }
  addItem(item: Course) {
    this.cs.create(`courses/${this.courseid}/standards`, item);
  }

  remove(id: string) {
    this.cs.remove(`courses/${this.courseid}/standards`, id);
  }
}
