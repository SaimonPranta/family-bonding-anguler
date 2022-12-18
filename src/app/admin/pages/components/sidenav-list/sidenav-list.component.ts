import {Component, Input, OnInit} from '@angular/core';
import {MenuCtrService} from '../../../../services/core/menu-ctr.service';
import {MenuAdmin} from "../../../../interfaces/core/menu-admin";


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Input() menuItems: MenuAdmin[];
  @Input() menuParentId: string = null;

  parentMenu: MenuAdmin[] = [];


  constructor(
    private menuCtrService: MenuCtrService
  ) {
  }

  ngOnInit() {
    this.parentMenu = this.menuItems.filter(item => item.parentId === this.menuParentId);
  }

  onClick(menuId) {
    this.menuCtrService.toggleMenuItemAdmin(menuId);
    this.menuCtrService.closeOtherSubMenusAdmin(this.menuItems, menuId);
  }


}
