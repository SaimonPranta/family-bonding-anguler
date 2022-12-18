import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdminService} from '../../../../services/admin/admin.service';
import {Admin} from '../../../../interfaces/admin/admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  today = new Date();
  @Output() sidenavNavToggle = new EventEmitter();

  adminData: Admin = null;

  constructor(
    private adminService: AdminService
  ) {
  }

  ngOnInit() {
    this.getLoggedInAdminData();
  }


  onToggleSidenav() {
    this.sidenavNavToggle.emit();
  }

  adminLogOut() {
    this.adminService.adminLogOut();
  }

  /**
   * HTTP Req Handle
   * Get Logged In Admin Info
   */
  private getLoggedInAdminData() {
    const select = 'username'
    this.adminService.getLoggedInAdminData(select)
      .subscribe(res => {
        this.adminData = res.data;
      }, error => {
        console.log(error)
      });
  }
}
