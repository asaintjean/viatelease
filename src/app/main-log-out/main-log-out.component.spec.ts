import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLogOutComponent } from './main-log-out.component';

describe('MainLogOutComponent', () => {
  let component: MainLogOutComponent;
  let fixture: ComponentFixture<MainLogOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLogOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLogOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
