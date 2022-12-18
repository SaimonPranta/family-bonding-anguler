import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionInterestTableDataComponent } from './expression-interest-table-data.component';

describe('ExpressionInterestTableDataComponent', () => {
  let component: ExpressionInterestTableDataComponent;
  let fixture: ComponentFixture<ExpressionInterestTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionInterestTableDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionInterestTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
