import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListDemandesComponent } from './main-list-demandes.component';

describe('MainListDemandesComponent', () => {
  let component: MainListDemandesComponent;
  let fixture: ComponentFixture<MainListDemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainListDemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainListDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
