import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTableauxBordComponent } from './main-tableaux-bord.component';

describe('MainTableauxBordComponent', () => {
  let component: MainTableauxBordComponent;
  let fixture: ComponentFixture<MainTableauxBordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTableauxBordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTableauxBordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
