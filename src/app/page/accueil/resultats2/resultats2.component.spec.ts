import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Resultats2Component } from './resultats2.component';

describe('Resultats2Component', () => {
  let component: Resultats2Component;
  let fixture: ComponentFixture<Resultats2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Resultats2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Resultats2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
