import { Standard } from './../../../global/classes';
import { Course } from 'src/app/global/classes';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-course-dialog',
  template: `
  <app-course-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-course-form>`
})

export class CourseDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-course-form',
  template: `
  <h4 class="mat-typography subheading-1">{{heading}}</h4>
  <form novalidate
  [formGroup]="form">
  <div fxLayout="column">
      <mat-form-field>
        <input matInput placeholder="Title" formControlName="subject_name">
      </mat-form-field>

      <mat-form-field>
          <mat-select formControlName="faculty" placeholder="Faculty">
            <mat-option value="Arts">Arts</mat-option>
            <mat-option value="Mathematics">Mathematics</mat-option>
            <mat-option value="Vocational">Vocational</mat-option>
          </mat-select>
      </mat-form-field>

      <mat-form-field>
          <mat-select formControlName="year_level" placeholder="Year Level">
            <mat-option value="11">11</mat-option>
            <mat-option value="12">12</mat-option>
            <mat-option value="13">13</mat-option>
            <mat-option value="Composite">Composite</mat-option>
          </mat-select>
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Subject Code" formControlName="subject_code">
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Teacher in Charge" formControlName="teacher_in_charge">
      </mat-form-field>

      <mat-form-field>
          <mat-select formControlName="course_endorsable" placeholder="Course Endorsement">
            <mat-option value="Yes">Yes</mat-option>
            <mat-option value="No">No</mat-option>
          </mat-select>
      </mat-form-field>

      <mat-form-field>
          <textarea formControlName="course_information" matInput placeholder="Course Information"></textarea>
      </mat-form-field>
    </div>
    <button mat-button (click)="save()" color="primary">Save</button>
</form>
  `,
  styles: [`
  .full-width {
    width: 100%;
  }
  `]
})
export class CourseFormComponent implements OnInit {
  @Input() currentFormValues: Course;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Course';
  edit = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      subject_name: ['', Validators.required],
      year_level: ['', Validators.required],
      subject_code: ['', Validators.required],
      teacher_in_charge: ['', Validators.required],
      course_endorsable: ['', Validators.required],
      course_information: ['', Validators.required],
      faculty: ['', Validators.required]
    });
    if (this.currentFormValues) {
      this.setFormValues();
    }
  }

  save() {this.formToSend.emit({data: this.form, edit: this.edit}); }

  setFormValues() {
    this.edit = true;
    this.form.setValue({
      subject_name: this.checkAvailability(this.currentFormValues.subject_name),
      year_level: this.checkAvailability(this.currentFormValues.year_level.toString()),
      subject_code: this.checkAvailability(this.currentFormValues.subject_code),
      teacher_in_charge: this.checkAvailability(this.currentFormValues.teacher_in_charge),
      course_endorsable: this.checkAvailability(this.currentFormValues.course_endorsable),
      course_information: this.checkAvailability(this.currentFormValues.course_information),
      faculty: this.checkAvailability(this.currentFormValues.faculty)
    });
  }

  checkAvailability(value: string) {
    if (value) {
      return value;
    } else {
      return '';
    }
  }
}

@Component({
  selector: 'app-standard-dialog',
  template: `
  <app-standard-form
  (formToSend)="handleForm($event)"
  [currentFormValues]="data.currentFormValues"
  >
  </app-standard-form>`
})

export class StandardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StandardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleForm($event) {
    this.dialogRef.close($event);
    }
}

@Component({
  selector: 'app-standard-form',
  template: `
  <h4 class="mat-h4">{{heading}}</h4>
  <form novalidate [formGroup]="form">
    <div class fxLayout="column">
      <mat-form-field class="example-full-width">
        <input matInput placeholder="Title" formControlName="title">
      </mat-form-field>
      <mat-form-field class="example-full-width">
          <input matInput placeholder="Standard No" formControlName="standardno">
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="version" placeholder="Version">
            <mat-option value="1">1</mat-option>
            <mat-option value="2">2</mat-option>
            <mat-option value="3">3</mat-option>
            <mat-option value="4">4</mat-option>
            <mat-option value="5">5</mat-option>
            <mat-option value="6">6</mat-option>
            <mat-option value="7">7</mat-option>
            <mat-option value="8">8</mat-option>
            <mat-option value="9">9</mat-option>
            <mat-option value="10">10</mat-option>
            <mat-option value="11">11</mat-option>
            <mat-option value="12">12</mat-option>
            <mat-option value="13">13</mat-option>
            <mat-option value="14">14</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="standardtype" placeholder="Standard Type">
            <mat-option value="AS">Achievement</mat-option>
            <mat-option value="US">Unit</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="assessmenttype" placeholder="Assessment Type">
            <mat-option value="Internal">Internal</mat-option>
            <mat-option value="External">External</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="further_assessment" placeholder="Further Reassessement">
            <mat-option value="Yes">Further Reassessement offered</mat-option>
            <mat-option value="No">Further Reassessement NOT offered</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="credits" placeholder="Credits">
            <mat-option value="1">1</mat-option>
            <mat-option value="2">2</mat-option>
            <mat-option value="3">3</mat-option>
            <mat-option value="4">4</mat-option>
            <mat-option value="5">5</mat-option>
            <mat-option value="6">6</mat-option>
            <mat-option value="7">7</mat-option>
            <mat-option value="8">8</mat-option>
            <mat-option value="9">9</mat-option>
            <mat-option value="10">10</mat-option>
            <mat-option value="11">11</mat-option>
            <mat-option value="12">12</mat-option>
            <mat-option value="13">13</mat-option>
            <mat-option value="14">14</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="literacy_numeracy" placeholder="Literacy / Numeracy">
            <mat-option value="NA">Not Applicable</mat-option>
            <mat-option value="L1 Literacy">L1 Literacy</mat-option>
            <mat-option value="L1 Numeracy">L1 Numeracy</mat-option>
            <mat-option value="L1 Literacy and Numeracy">L1 Literacy and Numeracy</mat-option>
            <mat-option value="Reading Literacy">Reading Literacy</mat-option>
            <mat-option value="Writing Literacy">Writing Literacy</mat-option>
            <mat-option value="Writing Literacy and Reading Literacy">Writing Literacy and Reading Literacy</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="level" placeholder="Assessment level">
            <mat-option value="1">1</mat-option>
            <mat-option value="2">2</mat-option>
            <mat-option value="3">3</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="assessment_method" placeholder="Mode of Assessment">
            <mat-option value="Exam">Exam</mat-option>
            <mat-option value="Written Report">Written Report</mat-option>
            <mat-option value="Oral Presentation">Oral Presentation</mat-option>
            <mat-option value="Visual Presentation">Visual Presentation</mat-option>
            <mat-option value="Portfolio">Portfolio</mat-option>
            <mat-option value="Performance">Performance</mat-option>
            <mat-option value="Project">Project</mat-option>
            <mat-option value="Other">Other</mat-option>
          </mat-select>
      </mat-form-field>
      <mat-form-field>
          <mat-select formControlName="completion" placeholder="Expected Completion">
            <mat-option value="Term 1">Term 1</mat-option>
            <mat-option value="Term 2">Term 2</mat-option>
            <mat-option value="Term 3">Term 3</mat-option>
            <mat-option value="Term 4">Term 4</mat-option>
          </mat-select>
      </mat-form-field>
    </div>
    <button mat-button (click)="save()" color="primary">Save</button>
  </form>
  `,
  styles: [`
  .full-width {
    width: 100%;
  }
  `]
})
export class StandardFormComponent implements OnInit {
  @Input() currentFormValues: Standard;
  @Output() formToSend = new EventEmitter();
  form: FormGroup;
  heading = 'Add Standard';
  edit = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      standardno: ['', Validators.required],
      version: ['', Validators.required],
      standardtype: ['', Validators.required],
      assessmenttype: ['', Validators.required],
      further_assessment: ['', Validators.required],
      credits: ['', Validators.required],
      literacy_numeracy: ['', Validators.required],
      level: ['', Validators.required],
      assessment_method: ['', Validators.required],
      completion: ['', Validators.required]
    });
    if (this.currentFormValues) {
      this.setFormValues();
    }
  }

  save() {this.formToSend.emit({data: this.form, edit: this.edit}); }

  setFormValues() {
    this.edit = true;
    this.form.setValue({
      title: this.checkAvailability(this.currentFormValues.title),
      standardno: this.checkAvailability(this.currentFormValues.standardno),
      version: this.checkAvailability(this.currentFormValues.version),
      standardtype: this.checkAvailability(this.currentFormValues.standardtype),
      assessmenttype: this.checkAvailability(this.currentFormValues.assessmenttype),
      further_assessment: this.checkAvailability(this.currentFormValues.further_assessment),
      credits: this.checkAvailability(this.currentFormValues.credits),
      literacy_numeracy: this.checkAvailability(this.currentFormValues.literacy_numeracy),
      level: this.checkAvailability(this.currentFormValues.level),
      assessment_method: this.checkAvailability(this.currentFormValues.assessment_method),
      completion: this.checkAvailability(this.currentFormValues.completion),
    });
  }

  checkAvailability(value: string) {
    if (value) {
      return value;
    } else {
      return '';
    }
  }
}


