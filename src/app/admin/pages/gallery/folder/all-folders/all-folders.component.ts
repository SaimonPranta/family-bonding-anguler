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
import {FileFolder} from '../../../../../interfaces/gallery/file-folder.interface';
import {FileFolderService} from '../../../../../services/gallery/file-folder.service';
import {AddFolderComponent} from '../add-folder/add-folder.component';
import {Select} from '../../../../../interfaces/core/select';
import {FILE_TYPES} from '../../../../../core/utils/app-data';

@Component({
  selector: 'app-all-folders',
  templateUrl: './all-folders.component.html',
  styleUrls: ['./all-folders.component.scss']
})
export class AllFoldersComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  fileFolders: FileFolder[] = [];
  holdPrevData: FileFolder[] = [];

  // Static Data
  fileTypes: Select[] = FILE_TYPES;

  // Pagination
  currentPage = 1;
  totalFileFolders = 0;
  fileFoldersPerPage = 10;
  totalFileFoldersStore = 0;

  // SEARCH AREA
  searchFileFolders: FileFolder[] = [];
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
    private fileFolderService: FileFolderService,
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
        this.getAllFileFolders();
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
      this.getAllFileFolders();
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
          this.searchFileFolders = [];
          this.fileFolders = this.holdPrevData;
          this.totalFileFolders = this.totalFileFoldersStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.fileFoldersPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          name: 1,
          slug: 1,
          type: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.fileFolderService.getAllFileFolders(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchFileFolders = res.data;
        this.fileFolders = this.searchFileFolders;
        this.totalFileFolders = res.count;
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
    const currentPageIds = this.fileFolders.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.fileFolders.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.fileFolders.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }
  private checkSelectionData() {
    let isAllSelect = true;
    this.fileFolders.forEach(m => {
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
    this.getAllFileFolders();
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
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllFileFolders();
    }
  }

  /**
   * HTTP REQ HANDLE
   *  getAllFileFolders()
   * deleteFileFolderById()
   * deleteMultipleBrandById()
   * updateMultipleBrandById()
   */

  private getAllFileFolders() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.fileFoldersPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      name: 1,
      slug: 1,
      type: 1,
      createdAt: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.fileFolderService.getAllFileFolders(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.fileFolders = res.data;
        if (this.fileFolders && this.fileFolders.length) {
          this.fileFolders.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.fileFolders[i].select = index !== -1;
          });

          this.totalFileFolders = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalFileFoldersStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deleteFileFolderById(id: string) {
    this.spinner.show();
    this.subDataFive = this.fileFolderService.deleteFileFolderById(id)
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

  private deleteMultipleFileFolderById() {
    this.spinner.show();
    this.subDataFour = this.fileFolderService.deleteMultipleFileFolderById(this.selectedIds)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllFileFolders();
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleFileFolderById(data: any) {
    this.spinner.show();
    this.subDataThree = this.fileFolderService.updateMultipleFileFolderById(this.selectedIds, data)
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
            this.deleteMultipleFileFolderById();
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
            this.updateMultipleFileFolderById(data);
          }
        });
  
      }
  
    }
  
    /**
     * COMPONENT DIALOG VIEW
     */
  
    openAddNewFolderDialog(data?: FileFolder) {
      this.dialog.open(AddFolderComponent, {
        data,
        panelClass: ['theme-dialog'],
        width: '95%',
        maxWidth: '480px',
        maxHeight: '90vh',
        autoFocus: false,
        disableClose: false
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
