/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StandardListComponent } from './standard-list.component';

describe('StandardListComponent', () => {
  let component: StandardListComponent;
  let fixture: ComponentFixture<StandardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
