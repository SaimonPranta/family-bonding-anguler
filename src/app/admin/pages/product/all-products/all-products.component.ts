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
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ConfirmDialogComponent} from '../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {ProductService} from '../../../../services/common/product.service';
import {Product} from '../../../../interfaces/common/product.interface';
import {Category} from '../../../../interfaces/common/category.interface';
import {Brand} from '../../../../interfaces/common/brand.interface';
import {CategoryService} from '../../../../services/common/category.service';
import {BrandService} from '../../../../services/common/brand.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  // Admin Base Data
  adminId: string;
  role: string;
  permissions: AdminPermissions[];

  // Store Data
  products: Product[] = [];
  holdPrevData: Product[] = [];

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 20;
  totalProductsStore = 0;

  // SEARCH AREA
  searchProducts: Product[] = [];
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // FilterData
  brands: Brand[] = [];
  categories: Category[] = [];

  today = new Date();
  dataFormDateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subDataEight: Subscription;
  private subRouteOne: Subscription;
  private subReload: Subscription;
  private subForm: Subscription;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
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
        this.getAllProducts();
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
      this.getAllProducts();
    });

    // Filter Data
    this.getAllCategories();
    this.getAllBrands();
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
          this.products = this.holdPrevData;
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
          slug: 1,
          images: 1,
          category: 1,
          subCategory: 1,
          brand: 1,
          unit: 1,
          costPrice: 1,
          salePrice: 1,
          hasVariations: 1,
          status: 1,
        }

        const filterData: FilterData = {
          pagination: pagination,
          filter: this.filter,
          select: mSelect,
          sort: this.sortQuery
        }
        return this.productService.getAllProducts(filterData, this.searchQuery);
      })
    )
      .subscribe(res => {
        this.searchProducts = res.data;
        this.products = this.searchProducts;
        this.totalProducts = res.count;
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
    const currentPageIds = this.products.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds)
      this.products.forEach(m => {
        m.select = true;
      })
    } else {
      currentPageIds.forEach(m => {
        this.products.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      })
    }
  }
  private checkSelectionData() {
    let isAllSelect = true;
    this.products.forEach(m => {
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
        this.getAllProducts();
      }
    }
  }

  /**
   * SORTING
   */
  sortData(query: any, type: number) {
    this.sortQuery = query;
    this.activeSort = type;
    this.getAllProducts();
  }

  /**
   * FILTERING
   */
  filterData(value: any, index: number, type: string) {
    switch (type) {
      case 'category': {
        this.filter = {...this.filter, ...{'category._id': value}};
        this.activeFilter1 = index;
        break;
      }
      case 'brand': {
        this.filter = {...this.filter, ...{'brand._id': value}};
        this.activeFilter2 = index;
        break;
      }
      default: {
        break;
      }
    }
    // Re fetch Data
    console.log(' this.filter',  this.filter)
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllProducts();
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
      this.getAllProducts();
    }
  }

  /**
   * HTTP REQ HANDLE
   * getAllProducts()
   * getAllCategories()
   * deleteMultipleProductById()
   * updateMultipleProductById()
   * cloneSingleProduct()
   */

  private getAllProducts() {
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
      slug: 1,
      images: 1,
      category: 1,
      subCategory: 1,
      brand: 1,
      unit: 1,
      costPrice: 1,
      salePrice: 1,
      hasVariations: 1,
      status: 1,
    }

    const filterData: FilterData = {
      pagination: pagination,
      filter: this.filter,
      select: mSelect,
      sort: this.sortQuery
    }


    this.subDataOne = this.productService.getAllProducts(filterData, this.searchQuery)
      .subscribe(res => {
        this.spinner.hide();
        this.products = res.data;
        if (this.products && this.products.length) {
          this.products.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.products[i].select = index !== -1;
          });

          this.totalProducts = res.count;
          if (!this.searchQuery) {
            this.holdPrevData = res.data;
            this.totalProductsStore = res.count;
          }

          this.checkSelectionData();
        }
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private getAllCategories() {

    // Select
    const mSelect = {
      name: 1,
      slug: 1
    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1}
    }


    this.subDataSix = this.categoryService.getAllCategories(filterData, null)
      .subscribe(res => {
        this.categories = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getAllBrands() {
    // Select
    const mSelect = {
      name: 1,
      slug: 1
    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1}
    }


    this.subDataSeven = this.brandService.getAllBrands(filterData, null)
      .subscribe(res => {
        this.brands = res.data;
      }, error => {
        console.log(error);
      });
  }

  private deleteProductById(id: string) {
    this.spinner.show();
    this.subDataFive = this.productService.deleteProductById(id)
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

  private deleteMultipleProductById() {
    this.spinner.show();
    this.subDataFour= this.productService.deleteMultipleProductById(this.selectedIds)
      .subscribe(res => {
        this.spinner.hide();
        if (res.success) {
          this.selectedIds = [];
          this.uiService.success(res.message);
          // fetch Data
          if (this.currentPage > 1) {
            this.router.navigate([], {queryParams: {page: 1}});
          } else {
            this.getAllProducts();
          }
        } else {
          this.uiService.warn(res.message)
        }

      }, error => {
        this.spinner.hide()
        console.log(error);
      });
  }

  private updateMultipleProductById(data: any) {
    this.spinner.show();
    this.subDataThree = this.productService.updateMultipleProductById(this.selectedIds, data)
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

  private cloneSingleProduct(id: string) {
    this.spinner.show();
    this.subDataEight = this.productService.cloneSingleProduct(id)
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

  /**
   * COMPONENT DIALOG VIEW
   */
   public openConfirmDialog(type: string, data?: any) {
    switch(type) {
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Delete',
            message: 'Are you sure you want delete this data?'
          }
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.deleteMultipleProductById();
          }
        });
        break;
      }
      case 'edit': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Edit',
            message: 'Are you sure you want edit this data?'
          }
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.updateMultipleProductById(data);
          }
        });
        break;
      }
      case 'clone': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Clone',
            message: 'Are you sure you want clone this data?'
          }
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.cloneSingleProduct(data);
          }
        });
        break;
      }
      default: {
        break;
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
    if (this.subDataSix) {
      this.subDataSix.unsubscribe();
    }
    if (this.subDataSeven) {
      this.subDataSeven.unsubscribe();
    }
    if (this.subDataEight) {
      this.subDataEight.unsubscribe();
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
