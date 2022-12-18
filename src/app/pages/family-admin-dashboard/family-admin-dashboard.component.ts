import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-admin-dashboard',
  templateUrl: './family-admin-dashboard.component.html',
  styleUrls: ['./family-admin-dashboard.component.scss']
})
export class FamilyAdminDashboardComponent implements OnInit {

  sideNav = true;
  submenu = false;
  submenu1 = false;
  submenu2 = false;
  submenu3 = false;

  constructor() { }

  ngOnInit(): void {

  }
  openSubmenu1() {
    this.submenu1=!this.submenu1
    this.submenu2 = false;
    this.submenu3 = false;

  }
  openSubmenu2() {
    this.submenu2=!this.submenu2
    this.submenu1 = false;
    this.submenu3 = false;
  }
  openSubmenu3() {
    this.submenu3=!this.submenu3
    this.submenu1 = false;
    this.submenu2 = false;
  }



 /**
   * SideNavToggle()
   */
 sideNavToggle() {
   this.sideNav = !this.sideNav;
   this.submenu1 = false;
   this.submenu2 = false;

}

sideMenuHide() {
  this.sideNav = false;

}

}
