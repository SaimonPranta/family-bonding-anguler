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
import {DistrictService} from '../../../../../services/common/district.service';
import {District} from '../../../../../interfaces/common/district.interface';

@Component({
  selector: 'app-all-districts',
  templateUrl: './all-districts.component.html',
  styleUrls: ['./all-districts.component.scss']
})
export class AllDistrictsComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  districts: District[] = [];
  holdPrevData: District[] = [];

  // Pagination
  currentPage = 1;
  totalDistricts = 0;
  districtsPerPage = 10;
  totalDistrictsStore = 0;

  // SEARCH AREA
  searchDistricts: District[] = [];
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
    private districtservice: DistrictService,
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
        this.getAllDistricts();
      });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllDistricts();
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
          this.searchDistricts = [];
          this.districts = this.holdPrevData;
          this.totalDistricts = this.totalDistrictsStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.districtsPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          slug: 1,
          image: 1,
          priority: 1,
          districts: 1,
          readOnly: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.districtservice.getAllDistricts(filterData, this.searchQuery);
      })
    )
      .subscribe({
        next: (res => {
          this.searchDistricts = res.data;
          this.districts = this.searchDistricts;
          this.totalDistricts = res.count;
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
    const currentPageIds = this.districts.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.districts.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.districts.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.districts.forEach(m => {
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
    this.getAllDistricts();
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
      case 'districts': {
        this.filter = {...this.filter, ...{districts: value}};
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
      this.getAllDistricts();
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
      this.getAllDistricts();
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllDistricts()
   * deleteDistrictById()
   * deleteMultipleDistrictById()
   * updateMultipleDistrictById()
   */

  private getAllDistricts() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.districtsPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      country: 1,
      division: 1,
      createdAt: 1,
      continent:1
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.districtservice.getAllDistricts(filterData, this.searchQuery)
      .subscribe({
        next: (res => {
          this.spinner.hide();
          this.districts = res.data;
          console.log('districts', this.districts)
          if (this.districts && this.districts.length) {
            this.districts.forEach((m, i) => {
              const index = this.selectedIds.findIndex(f => f === m._id);
              this.districts[i].select = index !== -1;
            });

            this.totalDistricts = res.count;
            if (!this.searchQuery) {
              this.holdPrevData = res.data;
              this.totalDistrictsStore = res.count;
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


  private deleteMultipleDistrictById() {
    this.spinner.show();
    this.subDataFour = this.districtservice.deleteMultipleDistrictById(this.selectedIds, true)
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
              this.getAllDistricts();
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

  private updateMultipleDistrictById(data: any) {
    this.spinner.show();
    this.subDataThree = this.districtservice.updateMultipleDistrictById(this.selectedIds, data)
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
          this.deleteMultipleDistrictById();
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
          this.updateMultipleDistrictById(data);
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
