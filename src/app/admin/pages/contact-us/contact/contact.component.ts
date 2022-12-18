import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {EMPTY, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {AdminService} from '../../../../services/admin/admin.service';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {ContactService} from '../../../../services/common/contact.service';
import {AdminPermissions} from '../../../../enum/admin-permission.enum';
import {UiService} from '../../../../services/core/ui.service';
import {Pagination} from '../../../../interfaces/core/pagination';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {UtilsService} from '../../../../services/core/utils.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {Contact} from '../../../../interfaces/common/contact.interface';
import {ReloadService} from '../../../../services/core/reload.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  contacts: Contact[] = [];
  holdPrevData: Contact[] = [];

  // Pagination
  currentPage = 1;
  totalContacts = 0;
  contactsPerPage = 30;
  totalContactsStore = 0;

  // SEARCH AREA
  searchContacts: Contact[] = [];
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
    private contactService: ContactService,
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
        this.getAllContacts();
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
      this.getAllContacts();
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
          this.searchContacts = [];
          this.contacts = this.holdPrevData;
          this.totalContacts = this.totalContactsStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.contactsPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          title: 1,
          name: 1,
          email: 1,
          phoneNo: 1,
          address: 1,
          queryType: 1,
          message: 1,
          subject: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.contactService.getAllContacts(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchContacts = res.data;
        this.contacts = this.searchContacts;
        this.totalContacts = res.count;
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
    const currentPageIds = this.contacts.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.contacts.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.contacts.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.contacts.forEach(m => {
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
    this.getAllContacts();
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
      this.getAllContacts();
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
        this.getAllContacts();
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
      this.getAllContacts();
    }
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
          this.deleteMultipleContactById();
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
          this.updateMultipleContactById(data);
        }
      });

    }

  }

  /**
   * HTTP REQ HANDLE
   * getAllContacts()
   * deleteContactById()
   * deleteMultipleContactById()
   * updateMultipleContactById()
   */


  private getAllContacts() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.contactsPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      title: 1,
      name: 1,
      email: 1,
      phoneNo: 1,
      address: 1,
      queryType: 1,
      message: 1,
      subject: 1,
      createdAt: 1,
    }


    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.contactService.getAllContacts(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.contacts = res.data;
        if (this.contacts && this.contacts.length) {
          this.contacts.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.contacts[i].select = index !== -1;
          });

          this.totalContacts = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalContactsStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deleteContactById(id: string) {
    this.spinner.show();
    this.subDataFive = this.contactService.deleteContactById(id, false)
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

  private deleteMultipleContactById() {
    this.spinner.show();
    this.subDataFour = this.contactService.deleteMultipleContactById(this.selectedIds, true)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllContacts();
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleContactById(data: any) {
    this.spinner.show();
    this.subDataThree = this.contactService.updateMultipleContactById(this.selectedIds, data)
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
