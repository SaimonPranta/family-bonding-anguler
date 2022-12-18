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
import {PromoOffer} from '../../../../../interfaces/common/promo-offer.interface';
import {PromoOfferService} from '../../../../../services/common/promo-offer.service';
import {
  ConfirmDialogWithCheckComponent
} from '../../../../../shared/components/ui/confirm-dialog-with-check/confirm-dialog-with-check.component';

@Component({
  selector: 'app-all-promoOffers',
  templateUrl: './all-promo-offer.component.html',
  styleUrls: ['./all-promo-offer.component.scss']
})
export class AllPromoOfferComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  promoOffers: PromoOffer[] = [];
  holdPrevData: PromoOffer[] = [];

  // Pagination
  currentPage = 1;
  totalPromoOffers = 0;
  promoOffersPerPage = 10;
  totalPromoOffersStore = 0;

  // SEARCH AREA
  searchPromoOffers: PromoOffer[] = [];
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
    private promoOfferService: PromoOfferService,
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
        this.getAllPromoOffers();
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
      this.getAllPromoOffers();
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
          this.searchPromoOffers = [];
          this.promoOffers = this.holdPrevData;
          this.totalPromoOffers = this.totalPromoOffersStore;
          this.searchQuery = null;
          return EMPTY;
        }
        const pagination: Pagination = {
          pageSize: Number(this.promoOffersPerPage),
          currentPage: Number(this.currentPage) - 1
        };
        // Select
        const mSelect = {
          title: 1,
          slug: 1,
          bannerImage: 1,
          startDateTime: 1,
          endDateTime: 1,
          products: 1,
          createdAt: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.promoOfferService.getAllPromoOffers(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchPromoOffers = res.data;
        this.promoOffers = this.searchPromoOffers;
        this.totalPromoOffers = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
      }, error => {
        console.log(error)
      });
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
    const currentPageIds = this.promoOffers.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.promoOffers.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.promoOffers.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }
  private checkSelectionData() {
    let isAllSelect = true;
    this.promoOffers.forEach(m => {
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
    this.getAllPromoOffers();
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
      case 'promoOffer': {
        this.filter = {...this.filter, ...{promoOffer: value}};
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
      this.getAllPromoOffers();
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
    // Re fetch Data
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllPromoOffers();
    }
  }


  /**
   * HTTP REQ HANDLE
   * getAllBrands()
   * deletePromoOfferById()
   * deleteMultipleBrandById()
   * updateMultiplePromoOfferById()
   */
  private getAllPromoOffers() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: Number(this.promoOffersPerPage),
      currentPage: Number(this.currentPage) - 1
    };

    // FilterData
    // const mQuery = this.filter.length > 0 ? {$and: this.filter} : null;

    // Select
    const mSelect = {
      title: 1,
      slug: 1,
      bannerImage: 1,
      startDateTime: 1,
      endDateTime: 1,
      products: 1,
      createdAt: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.promoOfferService.getAllPromoOffers(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.promoOffers = res.data;
        if (this.promoOffers && this.promoOffers.length) {
          this.promoOffers.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.promoOffers[i].select = index !== -1;
          });

          this.totalPromoOffers = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalPromoOffersStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private deletePromoOfferById(id: string) {
    this.spinner.show();
    this.subDataFive = this.promoOfferService.deletePromoOfferById(id, false)
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

  private deleteMultiplePromoOfferById(checkUsage: boolean) {
    this.spinner.show();
    this.subDataFour = this.promoOfferService.deleteMultiplePromoOfferById(this.selectedIds, checkUsage)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllPromoOffers();
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultiplePromoOfferById(data: any) {
    this.spinner.show();
    this.subDataThree = this.promoOfferService.updateMultiplePromoOfferById(this.selectedIds, data)
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
      const dialogRef = this.dialog.open(ConfirmDialogWithCheckComponent, {
        maxWidth: '400px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want delete this data?',
          showCheck: true,
          checkMessage: 'Remove this deal product discount also?',
          initialCheck: true
        }
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          if (dialogResult.isConfirm) {
            this.deleteMultiplePromoOfferById(dialogResult.isChecked);
          }

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
          this.updateMultiplePromoOfferById(data);
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
