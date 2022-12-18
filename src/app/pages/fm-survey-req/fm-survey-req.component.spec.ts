import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FMSurveyReqComponent } from './fm-survey-req.component';

describe('FMSurveyReqComponent', () => {
  let component: FMSurveyReqComponent;
  let fixture: ComponentFixture<FMSurveyReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FMSurveyReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FMSurveyReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
