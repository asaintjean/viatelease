import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListLitigesComponent } from './main-list-litiges.component';

describe('MainListLitigesComponent', () => {
  let component: MainListLitigesComponent;
  let fixture: ComponentFixture<MainListLitigesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainListLitigesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListLitigesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
