import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestAdminComponent } from './gest-admin.component';

describe('GestAdminComponent', () => {
  let component: GestAdminComponent;
  let fixture: ComponentFixture<GestAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
