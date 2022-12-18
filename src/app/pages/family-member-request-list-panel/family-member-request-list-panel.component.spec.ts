import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberRequestListPanelComponent } from './family-member-request-list-panel.component';

describe('FamilyMemberRequestListPanelComponent', () => {
  let component: FamilyMemberRequestListPanelComponent;
  let fixture: ComponentFixture<FamilyMemberRequestListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMemberRequestListPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMemberRequestListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
