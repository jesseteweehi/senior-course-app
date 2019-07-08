import { CoursesService } from './../courses.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Link } from './../global/classes';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnChanges {
  @Input() standardid: string;
  courseid: string;
  links$: Observable<Link[]>;

  formstandard: FormGroup;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cs: CoursesService) {
    this.courseid = this.route.snapshot.params.courseid;
  }

  ngOnInit() {
    this.formstandard = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  ngOnChanges() {
    this.links$ = this.cs.readcollection$(`courses/${this.courseid}/standards/${this.standardid}/standardresources`);
  }

  savelink() {
    this.cs.create(`courses/${this.courseid}/standards/${this.standardid}/standardresources`, this.formstandard.value);
    this.formstandard.reset();
  }

  deletelink(id: string) {
    this.cs.remove(`courses/${this.courseid}/standards/${this.standardid}/standardresources`, id);
  }

}
