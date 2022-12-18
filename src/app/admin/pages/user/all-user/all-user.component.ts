import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminPermissions} from '../../../../enum/admin-permission.enum';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import {EMPTY, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {ReloadService} from '../../../../services/core/reload.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilsService} from '../../../../services/core/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {Pagination} from '../../../../interfaces/core/pagination';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {User} from '../../../../interfaces/common/user.interface';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Select} from '../../../../interfaces/core/select';
import {GENDERS} from '../../../../core/utils/app-data';
import {Tag} from '../../../../interfaces/common/tag.interface';
import {TagService} from '../../../../services/common/tag.service';
import {UserDataService} from '../../../../services/common/user-data.service';
import {UserType} from '../../../../interfaces/common/user-type.interface';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Static Data
  genders: Select[] = GENDERS;

  // Store Data
  users: User[] = [];
  holdPrevData: User[] = [];
  designations: any[] = [];
  userTypes: UserType[] = [];
  tags: Tag[] = [];

  // Pagination
  currentPage = 1;
  totalUsers = 0;
  usersPerPage = 10;
  totalUsersStore = 0;

  // SEARCH AREA
  searchUsers: User[] = [];
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
  activeFilter3: number = null;

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
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private userService: UserDataService,
    private adminService: AdminService,
    private tagService: TagService,
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
        this.getAllUsers();
      });

    // GET PAGE FROM QUERY PARAM
    this.subRouteOne = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllUsers();
    });

    // Base Admin Data
    this.getAdminBaseData();
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

  get checkEditPermission(): boolean {
    return this.permissions.includes(AdminPermissions.EDIT);
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
          this.searchUsers = [];
          this.users = this.holdPrevData;
          this.totalUsers = this.totalUsersStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.usersPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          username: 1,
          phoneNo: 1,
          email: 1,
          profileImg: 1,
          joinDate: 1,
          gender: 1,
          userType: 1,
          designation: 1,
          hasAccess: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.userService.getAllUsers(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchUsers = res.data;
        this.users = this.searchUsers;
        this.totalUsers = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
      }, error => {
        console.log(error)
      });
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
    const currentPageIds = this.users.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.users.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.users.find(f => f._id === m).select = false;
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
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllUsers();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'designation': {
        this.filter = {...this.filter, ...{'designation._id': value}};
        this.activeFilter1 = index;
        break;
      }
      case 'userType': {
        this.filter = {...this.filter, ...{'userType._id': value}};
        this.activeFilter2 = index;
        break;
      }
      case 'gender': {
        this.filter = {...this.filter, ...{gender: value}};
        this.activeFilter3 = index;
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
      this.getAllUsers();
    }
  }

  /**
   * ON REMOVE ALL QUERY
   */

  onRemoveAllQuery() {
    this.activeSort = null;
    this.activeFilter1 = null;
    this.activeFilter2 = null;
    this.activeFilter3 = null;
    this.sortQuery = {createdAt: -1};
    this.filter = null;
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllUsers();
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
          this.deleteMultipleUserById();
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
          this.updateMultipleUserById(data);
        }
      });

    }

  }

  /**
   * HTTP REQ HANDLE
   */


  private getAllUsers() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.usersPerPage),
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
      profileImg: 1,
      joinDate: 1,
      gender: 1,
      userType: 1,
      designation: 1,
      hasAccess: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.userService.getAllUsers(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.users = res.data;
        if (this.users && this.users.length) {
          this.users.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.users[i].select = index !== -1;
          });

          this.totalUsers = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalUsersStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  /**
   * ADMIN BASE DATA
   */
  private getAdminBaseData() {
    this.adminId = this.adminService.getAdminId();
    this.role = this.adminService.getAdminRole();
    this.permissions = this.adminService.getAdminPermissions();
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.users.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteUserById(id: string) {
    this.spinner.show();
    this.subDataFive = this.userService.deleteUserById(id, false)
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

  private deleteMultipleUserById() {
    this.spinner.show();
    this.subDataFour = this.userService.deleteMultipleUserById(this.selectedIds, true)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllUsers();
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleUserById(data: any) {
    this.spinner.show();
    this.subDataThree = this.userService.updateMultipleUserById(this.selectedIds, data)
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
   * FILTER DATA With Date Range
   */

  endChangeRegDateRange(event: MatDatepickerInputEvent<any>) {
    if (event.value) {
      const startDate = this.utilsService.getDateString(this.dataFormDateRange.value.start);
      const endDate = this.utilsService.getDateString(this.dataFormDateRange.value.end);

      const qData = {joinDate: {$gte: startDate, $lte: endDate}};
      this.filter = {...this.filter, ...qData};
      // const index = this.filter.findIndex(x => x.hasOwnProperty('createdAt'));

      if (this.currentPage > 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      } else {
        this.getAllUsers();
      }
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
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
  }

}
