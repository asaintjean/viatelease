import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCreateDemandeComponent } from './main-create-demande.component';

describe('MainCreateDemandeComponent', () => {
  let component: MainCreateDemandeComponent;
  let fixture: ComponentFixture<MainCreateDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCreateDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCreateDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
