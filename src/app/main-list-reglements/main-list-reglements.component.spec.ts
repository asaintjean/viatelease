import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListReglementsComponent } from './main-list-reglements.component';

describe('MainListReglementsComponent', () => {
  let component: MainListReglementsComponent;
  let fixture: ComponentFixture<MainListReglementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainListReglementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListReglementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
