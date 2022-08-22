import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestAnnonceComponent } from './gest-annonce.component';

describe('GestAnnonceComponent', () => {
  let component: GestAnnonceComponent;
  let fixture: ComponentFixture<GestAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
