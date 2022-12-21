import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpAdAnalysisOneComponent } from './sp-add-analysis-one.component';

describe('SpAdAnalysisOneComponent', () => {
  let component: SpAdAnalysisOneComponent;
  let fixture: ComponentFixture<SpAdAnalysisOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpAdAnalysisOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpAdAnalysisOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
