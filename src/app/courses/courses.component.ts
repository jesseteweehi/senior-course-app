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
  course$: Observable<Course>;
  standards$: Observable<Standard[]>;
  courseid: string;

  form: FormGroup;

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
      opportunities_offered: ['', Validators.required],
      approximate_date_due: ['', Validators.required],
      standardno: ['', Validators.required],
      version: ['', Validators.required],
      domain: ['', Validators.required],
      subfield: ['', Validators.required],
      level: ['1', Validators.required],
      credits: ['', Validators.required],
      title: ['', Validators.required],
      literacy_numeracy: ['', Validators.required]
    });
  }
  save() {
    this.addItem(this.form.value);
  }
  addItem(item: Course) {
    this.cs.create(`courses/${this.courseid}/standards`, item);
  }
}
