import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainParcComponent } from './main-parc.component';

describe('MainParcComponent', () => {
  let component: MainParcComponent;
  let fixture: ComponentFixture<MainParcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainParcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainParcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
