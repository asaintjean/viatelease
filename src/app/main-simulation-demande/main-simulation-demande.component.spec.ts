import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSimulationDemandeComponent } from './main-simulation-demande.component';

describe('MainSimulationDemandeComponent', () => {
  let component: MainSimulationDemandeComponent;
  let fixture: ComponentFixture<MainSimulationDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSimulationDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSimulationDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
