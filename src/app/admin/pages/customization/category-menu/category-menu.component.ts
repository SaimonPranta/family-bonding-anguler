import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {UiService} from '../../../../services/core/ui.service';
import {CategoryMenu} from '../../../../interfaces/common/category-menu';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {ReloadService} from '../../../../services/core/reload.service';
import {CategoryMenuService} from '../../../../services/common/category-menu.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit, OnDestroy {

  // Category Menu
  categoryMenus: CategoryMenu[] = [];

  // Subscriptions
  private subReload: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(
    private menuService: CategoryMenuService,
    private reloadService: ReloadService,
    private dialog: MatDialog,
    private uiService: UiService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.subReload = this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllCategoryMenu();
      });

    // Base Data
    this.getAllCategoryMenu();
  }


  /**
   * HTTP REQ
   */
  private getAllCategoryMenu() {
    this.spinner.show();
    this.subDataOne = this.menuService.getAllCategoryMenus()
      .subscribe(res => {
        this.categoryMenus = res.data;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deleteCategoryMenuById(id: string) {
    this.spinner.show();
    this.subDataTwo = this.menuService.deleteCategoryMenuById(id)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshData$();
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  /**
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
   */
  public openConfirmDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this category?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteCategoryMenuById(id);
      }
    });
  }


  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
  }


}
