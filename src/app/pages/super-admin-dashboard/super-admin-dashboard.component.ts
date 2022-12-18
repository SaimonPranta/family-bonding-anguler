import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {

  sideNav = true;
  submenu = false;
  submenu1 = false;
  submenu2 = false;
  submenu3 = false;
  submenu4 = false;
  constructor() { }

  ngOnInit(): void {

  }
  openSubmenu1() {
    this.submenu1=!this.submenu1
    this.submenu2 = false;
    this.submenu3 = false;
    this.submenu4 = false;
  }
  openSubmenu2() {
    this.submenu2=!this.submenu2
    this.submenu1 = false;
    this.submenu3 = false;
    this.submenu4 = false;
  }
  openSubmenu3() {
    this.submenu3=!this.submenu3
    this.submenu2 = false;
    this.submenu1 = false;
    this.submenu4 = false;
  }
  openSubmenu4() {
    this.submenu4=!this.submenu4
    this.submenu2 = false;
    this.submenu1 = false;
    this.submenu3 = false;
  }


 /**
   * SideNavToggle()
   */
 sideNavToggle() {
   this.sideNav = !this.sideNav;
   this.submenu1 = false;
   this.submenu2 = false;
   this.submenu3 = false;
   this.submenu4 = false;
}

sideMenuHide() {
  this.sideNav = false;

}



}



