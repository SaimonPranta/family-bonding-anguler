import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmToDoListComponent } from './fm-to-do-list.component';

describe('FmToDoListComponent', () => {
  let component: FmToDoListComponent;
  let fixture: ComponentFixture<FmToDoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmToDoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
