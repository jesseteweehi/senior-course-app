import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Standard {
  date_created: string;
  date_updated: string;
  standardtype: string;
  standardno: string;
  version: string;
  assessmenttype: string;
  opportunities_offered: string;
  domain: string;
  subfield: string;
  level: string;
  credits: string;
  title: string;
  literacy_numeracy: string;
  assessment_method: string;
  approximate_date_due: string;
}

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})
export class StandardsComponent implements OnInit {
  private standardsCollection: AngularFirestoreCollection<Standard>;
  standards: Observable<Standard[]>;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore
              ) {
                this.standardsCollection = afs.collection<Standard>('standards');
                this.standards = this.standardsCollection.valueChanges();
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
    console.log(this.form.value.title);
    this.addItem(this.form.value);
  }

  addItem(item: Standard) {
    console.log(item);
    this.standardsCollection.add(item);
  }

}
