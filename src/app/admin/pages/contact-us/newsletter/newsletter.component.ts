import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {EMPTY, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {AdminService} from '../../../../services/admin/admin.service';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {NewsletterService} from '../../../../services/common/newsletter.service';
import {AdminPermissions} from '../../../../enum/admin-permission.enum';
import {UiService} from '../../../../services/core/ui.service';
import {Pagination} from '../../../../interfaces/core/pagination';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {UtilsService} from '../../../../services/core/utils.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {Newsletter} from '../../../../interfaces/common/newsletter.interface';
import {ReloadService} from '../../../../services/core/reload.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-all-newsletters',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  newsletters: Newsletter[] = [];
  holdPrevData: Newsletter[] = [];

  // Pagination
  currentPage = 1;
  totalNewsletters = 0;
  newslettersPerPage = 30;
  totalNewslettersStore = 0;

  // SEARCH AREA
  searchNewsletters: Newsletter[] = [];
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

  // Date Range
  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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
    private newsletterService: NewsletterService,
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
        this.getAllNewsletters();
      });

    // Base Admin Data
    this.getAdminBaseData();

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllNewsletters();
    });
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
          this.searchNewsletters = [];
          this.newsletters = this.holdPrevData;
          this.totalNewsletters = this.totalNewslettersStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.newslettersPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          email: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.newsletterService.getAllNewsletters(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchNewsletters = res.data;
        this.newsletters = this.searchNewsletters;
        this.totalNewsletters = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
      }, error => {
        console.log(error)
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
    const currentPageIds = this.newsletters.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.newsletters.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.newsletters.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }
  private checkSelectionData() {
    let isAllSelect = true;
    this.newsletters.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }
  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }

  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllNewsletters();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'category': {
        this.filter = {...this.filter, ...{category: value}};
        this.activeFilter1 = index;
        break;
      }
      case 'brand': {
        this.filter = {...this.filter, ...{brand: value}};
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
      this.getAllNewsletters();
    }
  }

  /**
   * FILTER DATA With Date Range
   */

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(this.dataFormDateRange.value.start);
      const endDate = this.utilsService.getDateString(this.dataFormDateRange.value.end);

      const qData = {createdAt: {$gte: startDate, $lte: endDate}};
      this.filter = {...this.filter, ...qData};
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      } else {
        this.getAllNewsletters();
      }
    }
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    this.dataFormDateRange.reset();
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllNewsletters();
    }
  }


  /**
   * HTTP REQ HANDLE
   * getAllNewsletters()
   *  deleteNewsletterById()
   * deleteMultipleNewsletterById()
   * updateMultipleNewsletterById()
   */

  private getAllNewsletters() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.newslettersPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      email: 1,
      createdAt: 1,
    }


    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.newsletterService.getAllNewsletters(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.newsletters = res.data;
        if (this.newsletters && this.newsletters.length) {
          this.newsletters.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.newsletters[i].select = index !== -1;
          });

          this.totalNewsletters = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalNewslettersStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deleteNewsletterById(id: string) {
    this.spinner.show();
    this.subDataFive = this.newsletterService.deleteNewsletterById(id, false)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deleteMultipleNewsletterById() {
    this.spinner.show();
    this.subDataFour = this.newsletterService.deleteMultipleNewsletterById(this.selectedIds, true)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllNewsletters();
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleNewsletterById(data: any) {
    this.spinner.show();
    this.subDataThree = this.newsletterService.updateMultipleNewsletterById(this.selectedIds, data)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          this.reloadService.needRefreshData$();
        } else {
          this.uiService.warn(res.message)
        }
      }, error => {
        this.spinner.hide()
        console.log(error);
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
            this.deleteMultipleNewsletterById();
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
            this.updateMultipleNewsletterById(data);
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
