import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminPermissions} from '../../../../../enum/admin-permission.enum';
import {NgForm} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {EMPTY, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {ReloadService} from '../../../../../services/core/reload.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilsService} from '../../../../../services/core/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {Pagination} from '../../../../../interfaces/core/pagination';
import {FilterData} from '../../../../../interfaces/core/filter-data';
import {ConfirmDialogComponent} from '../../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';


import {Continent} from '../../../../../interfaces/common/continent.interface';
import {ContinentService} from '../../../../../services/common/continent.service';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-continent.component.html',
  styleUrls: ['./all-continent.component.scss']
})
export class AllContinentComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  continent: Continent[] = [];
  holdPrevData: Continent[] = [];

  // Pagination
  currentPage = 1;
  totalContinentrys = 0;
  continentsPerPage = 10;
  totalContinentsStore = 0;

  // SEARCH AREA
  searchContinents: Continent[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;


  // Sort
  sortQuery = {createdAt: -1};
  activeSort: number = null;
  activeFilter1: number = null;
  activeFilter2: number = null;

  // FilterData
  filter: any = null;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private continentService: ContinentService,
    private adminService: AdminService,
    private uiService: UiService,
    private reloadService: ReloadService,
    private spinner: NgxSpinnerService,
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.subReload = this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllContinents();
      });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllContinents();
    });

    // Base Admin Data
    this.getAdminBaseData();
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
          this.searchContinents = [];
          this.continent = this.holdPrevData;
          this.totalContinentrys = this.totalContinentsStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.continentsPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          slug: 1,
          image: 1,
          priority: 1,
          continent: 1,
          readOnly: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.continentService.getAllContinents(filterData, this.searchQuery);
      })
    )
      .subscribe({
        next: (res => {
          this.searchContinents = res.data;
          this.continent = this.searchContinents;
          this.totalContinentrys = res.count;
          this.currentPage = 1;
          this.router.navigate([], {queryParams: {page: this.currentPage}});
        }),
        error: (error => {
          console.log(error)
        })
      });
  }

  /**
   * CHECK ADMIN PERMISSION
   * checkAddPermission()
   * checkDeletePermission()
   * checkEditPermission()
   * getAdminBaseData()
   */
  get checkAddPermission(): boolean {
    return this.permissions.includes(AdminPermissions.CREATE);
  }

  get checkDeletePermission(): boolean {
    return this.permissions.includes(AdminPermissions.DELETE);
  }

  get checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
  }

  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }


  /**
   * ON Select Check
   * onCheckChange()
   * onAllSelectChange()
   * checkSelectionData()
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
    const currentPageIds = this.continent.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.continent.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.continent.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.continent.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * PAGINATION CHANGE
   * onPageChanged()
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }
  /**
   * SORTING
   * sortData()
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllContinents();
  }
  /**
   * FILTERING
   * filterData()
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'category': {
        this.filter = {...this.filter, ...{category: value}};
        this.activeFilter1 = index;
        break;
      }
      case 'continent': {
        this.filter = {...this.filter, ...{continent: value}};
        this.activeFilter2 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllContinents();
    }
  }

  /**
   * ON REMOVE ALL QUERY
   * onRemoveAllQuery()
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllContinents();
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllContinents()
   * deletecontinentById()
   * deleteMultiplecontinentById()
   * updateMultiplecontinentById()
   */

  private getAllContinents() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.continentsPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      image: 1,
      priority: 1,
      continent: 1,
      readOnly: 1,
      createdAt: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.continentService.getAllContinents(filterData, this.searchQuery)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          this.continent = res.data;
          if (this.continent && this.continent.length) {
            this.continent.forEach((m, i) => {
              const index = this.selectedIds.findIndex(f => f === m._id);
              this.continent[i].select = index !== -1;
            });

            this.totalContinentrys = res.count;
            if (!this.searchQuery) {
              this.holdPrevData = res.data;
              this.totalContinentsStore = res.count;
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


  private deleteMultiplecontinentById() {
    this.spinner.show();
    this.subDataFour = this.continentService.deleteMultipleContinentById(this.selectedIds, true)
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
              this.getAllContinents();
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

  private updateMultiplecontinentById(data: any) {
    this.spinner.show();
    this.subDataThree = this.continentService.updateMultipleContinentById(this.selectedIds, data)
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
   * COMPONENT DIALOG VIEW
   * openConfirmDialog()
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
          this.deleteMultiplecontinentById();
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
          this.updateMultiplecontinentById(data);
        }
      });

    }

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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
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
