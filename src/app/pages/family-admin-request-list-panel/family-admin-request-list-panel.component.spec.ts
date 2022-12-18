import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAdminRequestListPanelComponent } from './family-admin-request-list-panel.component';

describe('FamilyAdminRequestListPanelComponent', () => {
  let component: FamilyAdminRequestListPanelComponent;
  let fixture: ComponentFixture<FamilyAdminRequestListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyAdminRequestListPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAdminRequestListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
