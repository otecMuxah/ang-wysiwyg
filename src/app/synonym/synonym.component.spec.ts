/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { synonymComponent } from './synonym.component';

describe('synonymComponent', () => {
  let component: synonymComponent;
  let fixture: ComponentFixture<synonymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ synonymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(synonymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
