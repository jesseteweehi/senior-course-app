import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Item {
  standardtype: string;
  assessmenttype: string;
  domain: string;
  subfield: string;
  level: string;
  credits: string;
  title: string;
}

@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})
export class StandardsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore
              ) {
                this.itemsCollection = afs.collection<Item>('items');
                this.items = this.itemsCollection.valueChanges();
              }

  ngOnInit() {
    this.form = this.fb.group({
      standardtype: ['Achievement', Validators.required],
      assessmenttype: ['Internal', Validators.required],
      domain: ['', Validators.required],
      subfield: ['', Validators.required],
      level: ['1', Validators.required],
      credits: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  save() {
    console.log(this.form.value.title);
    this.addItem(this.form.value);
  }

  addItem(item: Item) {
    console.log(item);
    this.itemsCollection.add(item);
  }

}
