import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {SubCategoryService} from '../../../../../services/common/sub-category.service';
import {CategoryMenuService} from '../../../../../services/common/category-menu.service';
import {CategoryMenu, HasChild2} from '../../../../../interfaces/common/category-menu';
import {UiService} from '../../../../../services/core/ui.service';
import {ConfirmDialogComponent} from '../../../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {Select} from '../../../../../interfaces/core/select';
import {UtilsService} from '../../../../../services/core/utils.service';
import {CategoryService} from '../../../../../services/common/category.service';
import {BrandService} from '../../../../../services/common/brand.service';
import {Brand} from '../../../../../interfaces/common/brand.interface';
import {Category} from '../../../../../interfaces/common/category.interface';
import {SubCategory} from '../../../../../interfaces/common/sub-category.interface';
import {IconTypeEnum} from '../../../../../enum/icon-type.enum';
import {FilterData} from '../../../../../interfaces/core/filter-data';

@Component({
  selector: 'app-add-category-menu',
  templateUrl: './add-category-menu.component.html',
  styleUrls: ['./add-category-menu.component.scss']
})
export class AddCategoryMenuComponent implements OnInit, OnDestroy {

  //Subscription
  private subAcRoute: Subscription;
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;

  priority: number = null;
  iconType: string = null;
  iconName: string = null;
  catName: string = null;
  categoryMenu: CategoryMenu = null;

  // Store Product
  id: string = null;
  storedCategoryMenu: CategoryMenu = null;

  // SELECT DATA
  brands: Brand[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  @ViewChild('inputElement') inputElement: any;
  @ViewChild('inputIconName') inputIconName: any;
  @ViewChild('inputIconType') inputIconType: MatSelect;
  @ViewChild('matSelectCat') matSelectCat: MatSelect;
  @ViewChild('matSelectSubCat') matSelectSubCat: MatSelect;

  // Static Data
  iconTypes: Select[] = [
    {value: IconTypeEnum.MATERIAL, viewValue: 'Material Icon'},
    {value: IconTypeEnum.FONT_AWESOME, viewValue: 'Font Awesome Icon'},
  ];


  constructor(
    private utilsService: UtilsService,
    private uiService: UiService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private menuService: CategoryMenuService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    // GET ID FORM PARAM
    this.subAcRoute = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getCategoryMenuById();
      }
    });

    // Base Data
    this.getAllCategories();
    this.getAllBrands();

  }

  /**
   * SELECTIONS METHODS
   * onSelectCategory()
   * onSelectSubCat()
   * onSelectSubCatBrand()
   * priorityChangeFn()
   */
  onSelectCategory(event: MatSelectChange) {
    this.categoryMenu = {
      id: event.value._id,
      name: event.value.name,
      slug: event.value.slug,
      hasChild: [],
      priority: this.priority
    };

    this.getSubCategoriesByCategoryId(event.value._id);
  }

  onSelectSubCat(event: MatSelectChange) {
    this.categoryMenu.hasChild = event.value.map(m => {
      return {
        id: m._id,
        name: m.name,
        slug: m.slug,
        hasChild: [],
        priority: null,
      };
    });
  }

  onSelectSubCatBrand(event: MatSelectChange, index: number) {
    this.categoryMenu.hasChild[index].hasChild = event.value.map(m => {
      return {
        id: m._id,
        name: m.name,
        slug: m.slug,
        hasChild: [],
        priority: null,
      };
    });
  }

  priorityChangeFn(event: any) {
    if (this.categoryMenu === null) {
      this.categoryMenu = {
        id: null,
        name: null,
        slug: null,
        hasChild: [],
        priority: event
      };
    } else {
      this.categoryMenu.priority = event;
    }

  }

  /**
   * SET DATA & GET DATA
   * setData()
   * getBrand()
   */

  private setData() {
    this.priority = this.storedCategoryMenu.priority;
    this.matSelectCat.value = this.categories.find(f => f._id === this.storedCategoryMenu.id);
  }

  getBrand(childBrands: HasChild2[]) {
    if (this.id) {
      return this.brands.filter(arr1 =>
        childBrands.filter(arr2 => arr2.id === arr1._id).length !== 0);
    } else {
      return null;
    }
  }



  /**
   * HTTP REQ HANDLE
   * getAllCategories()
   * getAllBrands()
   * getSubCategoriesByCategoryId()
   * getCategoryMenuById()
   * addNewCategoryMenu()
   */

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


    this.subDataOne = this.categoryService.getAllCategories(filterData, null)
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


    this.subDataTwo = this.brandService.getAllBrands(filterData, null)
      .subscribe(res => {
        this.brands = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getSubCategoriesByCategoryId(categoryId: string) {
    const select = 'name category slug'
    this.subDataThree = this.subCategoryService.getSubCategoriesByCategoryId(categoryId, select)
      .subscribe(res => {
        this.subCategories = res.data;
        if (this.id) {
          this.matSelectSubCat.value = this.subCategories.filter(arr1 =>
            this.categoryMenu.hasChild.filter(arr2 => arr2.id === arr1._id).length !== 0);

        }
      }, error => {
        console.log(error);
      });
  }

  private getCategoryMenuById() {
    this.spinner.show();
    this.subDataFour = this.menuService.getCategoryMenuById(this.id)
      .subscribe(res => {
        this.storedCategoryMenu = res.data;
        console.log('Data: ', res.data);
        this.categoryMenu = this.storedCategoryMenu;
        this.iconType = res.data.iconType;
        this.iconName = res.data.iconName;
        this.catName = res.data.name;
        this.getSubCategoriesByCategoryId(this.categoryMenu.id);
        if (this.storedCategoryMenu) {
          this.setData();
        }
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }


  private addNewCategoryMenu() {
    this.spinner.show();
    const mData = {
      priority: this.priority,
      iconType: this.iconType,
      iconName: this.iconName
    };
    const finalData = {...this.categoryMenu, ...mData};
    console.log('finalData', finalData)
    this.subDataFive = this.menuService.addCategoryMenu(finalData)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.categoryMenu = null;
        this.subCategories = [];
        this.priority = null;
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  private updateCategoryMenu() {
    this.spinner.show();
    const mData = {
      priority: this.priority,
      iconType: this.iconType,
      iconName: this.iconName
    };
    const finalData = {...this.categoryMenu, ...mData};
    this.subDataSix = this.menuService.updateCategoryMenuById(this.id, finalData)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }



  /**
   * DIALOG
   * openConfirmDialog()
   */
  public openConfirmDialog() {
    if (!this.priority) {
      this.uiService.wrong('Priority is required');
      return;
    }

    // if (!this.iconType) {
    //   this.uiService.wrong('Icon Type is required');
    //   return;
    // }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Save',
        message: 'Are you sure you want save this menu?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (this.id) {
          this.updateCategoryMenu();
        } else {
          this.addNewCategoryMenu();
        }
      }
    });
  }


  /**
   * ON DESTROY
   */
  ngOnDestroy(): void {
    if (this.subAcRoute) {
      this.subAcRoute.unsubscribe();
    }
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
  }
}
