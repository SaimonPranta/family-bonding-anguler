import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {Pagination} from '../../../../interfaces/core/pagination';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../../services/core/utils.service';
import {EMPTY, Subscription} from 'rxjs';
import {UiService} from '../../../../services/core/ui.service';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {ReloadService} from '../../../../services/core/reload.service';
import {Admin} from '../../../../interfaces/admin/admin';
import {AdminDataService} from '../../../../services/admin/admin-data.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {AdminService} from '../../../../services/admin/admin.service';
import {AdminPermissions} from '../../../../enum/admin-permission.enum';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})
export class AllAdminsComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  admins: Admin[] = [];
  holdPrevData: Admin[] = [];

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 10;
  totalProductsStore = 0;

  // SEARCH AREA
  searchProducts: Admin[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // FilterData Date Range
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // Sort
  sortQuery = {createdAt: -1};
  activeSort: number = null;

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private adminDataService: AdminDataService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  /**
   * CHECK ADMIN PERMISSION
   */
  get checkAddPermission(): boolean {
    return this.permissions.includes(AdminPermissions.CREATE);
  }

  get checkDeletePermission(): boolean {
    return this.permissions.includes(AdminPermissions.DELETE);
  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue.pipe(
      // map(t => t.searchTerm)
      // filter(() => this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (this.searchQuery === '' || this.searchQuery === null) {
          this.searchProducts = [];
          this.admins = this.holdPrevData;
          this.totalProducts = this.totalProductsStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.productsPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          username: 1,
          phoneNo: 1,
          email: 1,
          lastLoggedIn: 1,
          hasAccess: 1,
          createdAt: 1
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.adminDataService.getAllAdmins(filterData, this.searchQuery);
      })
    )
      .subscribe({
        next: (res => {
          this.searchProducts = res.data;
          this.admins = this.searchProducts;
          this.totalProducts = res.count;
          this.currentPage = 1;
          this.router.navigate([], {queryParams: {page: this.currentPage}});
        }),
        error: (error => {
          console.log(error)
        })
      });
  }

  get checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
  }

  /**
   * ON Select Check
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex(f => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.admins.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.admins.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.admins.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }

  /**
   * FILTER DATA With Date Range
   */

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(this.dataFormDateRange.value.start);
      const endDate = this.utilsService.getDateString(this.dataFormDateRange.value.end);

      const qData = {registrationAt: {$gte: startDate, $lte: endDate}};
      this.filter = {...this.filter, ...qData};
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      } else {
        this.getAllAdmins();
      }
    }
  }

  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllAdmins();
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllAdmins();
    }
  }

  /**
   * HTTP REQ HANDLE
   */

  private getAllAdmins() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.productsPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      username: 1,
      phoneNo: 1,
      email: 1,
      lastLoggedIn: 1,
      hasAccess: 1,
      createdAt: 1
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.adminDataService.getAllAdmins(filterData, this.searchQuery)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          this.admins = res.data;
          if (this.admins && this.admins.length) {
            this.admins.forEach((m, i) => {
              const index = this.selectedIds.findIndex(f => f === m._id);
              this.admins[i].select = index !== -1;
            });

            this.totalProducts = res.count;
            if (!this.searchQuery) {
              this.holdPrevData = res.data;
              this.totalProductsStore = res.count;
            }

            this.checkSelectionData();
          }
        }),
        error: (error => {
          this.spinner.hide();
          console.log(error);
        })
      });
  }

  ngOnInit(): void {

    this.subReload = this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllAdmins();
      });

    // Base Admin Data
    this.getAdminBaseData();

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams
      .subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllAdmins();
    });
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(type: string, data?: any) {
    if (type === 'delete') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want delete this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.deleteMultipleAdminById();
        }
      });
    } else if (type === 'edit') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Edit',
          message: 'Are you sure you want edit this data?'
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.updateMultipleAdminById(data);
        }
      });

    }

  }

  /**
   * ADMIN BASE DATA
   */
  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
    console.log('this.adminId', this.adminId);
    console.log('this.role', this.role);
    console.log('this.permissions', this.permissions);
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.admins.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteAdminById(id: string) {
    this.spinner.show();
    this.adminDataService.deleteAdminById(id)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          if (res.success) {
            this.uiService.success(res.message);
            this.reloadService.needRefreshData$();
          } else {
            this.uiService.warn(res.message);
          }
        }),
        error: (error => {
          this.spinner.hide();
          console.log(error);
        })
      });
  }

  private deleteMultipleAdminById() {
    this.spinner.show();
    // Remove Current Admin Id
    const mSelectedIds = this.selectedIds.filter(m => m !== this.adminId);
    this.adminDataService.deleteMultipleAdminById(mSelectedIds)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          if (res.success) {
            this.selectedIds = [];
            this.uiService.success(res.message);
            // fetch Data
            if (this.currentPage > 1) {
              this.router.navigate([], {queryParams: {page: 1}});
            } else {
              this.getAllAdmins();
            }
          } else {
            this.uiService.warn(res.message)
          }

        }),
        error: (error => {
          this.spinner.hide()
          console.log(error);
        })
      });
  }

  private updateMultipleAdminById(data: any) {
    this.spinner.show();
    // Remove Current Admin Id
    const mSelectedIds = this.selectedIds.filter(m => m !== this.adminId);
    this.adminDataService.updateMultipleAdminById(mSelectedIds, data)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          if (res.success) {
            this.selectedIds = [];
            this.uiService.success(res.message);
            this.reloadService.needRefreshData$();
          } else {
            this.uiService.warn(res.message)
          }
        }),
        error: (error => {
          this.spinner.hide()
          console.log(error);
        })
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
    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }
    if (this.subReload) {
      this.subReload.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
  }


}
