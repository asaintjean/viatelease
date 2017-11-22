import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEspaceKdoComponent } from './main-espace-kdo.component';

describe('MainEspaceKdoComponent', () => {
  let component: MainEspaceKdoComponent;
  let fixture: ComponentFixture<MainEspaceKdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEspaceKdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEspaceKdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
