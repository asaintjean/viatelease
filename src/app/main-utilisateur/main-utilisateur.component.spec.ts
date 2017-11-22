import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUtilisateurComponent } from './main-utilisateur.component';

describe('MainUtilisateurComponent', () => {
  let component: MainUtilisateurComponent;
  let fixture: ComponentFixture<MainUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
