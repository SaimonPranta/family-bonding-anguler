import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Select} from '../../../../interfaces/core/select';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../services/admin/admin.service';
import {UiService} from '../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductService} from '../../../../services/common/product.service';
import {UtilsService} from '../../../../services/core/utils.service';
import {Product} from '../../../../interfaces/common/product.interface';
import {
  AMOUNT_TYPES,
  DISCOUNT_TYPES,
  EMI_MONTHS,
  PRODUCT_STATUS,
  VARIATION_IMG_PLACEHOLDER
} from '../../../../core/utils/app-data';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Category} from '../../../../interfaces/common/category.interface';
import {CategoryService} from '../../../../services/common/category.service';
import {FilterData} from '../../../../interfaces/core/filter-data';
import {Brand} from '../../../../interfaces/common/brand.interface';
import {BrandService} from '../../../../services/common/brand.service';
import {Tag} from '../../../../interfaces/common/tag.interface';
import {TagService} from '../../../../services/common/tag.service';
import {SubCategoryService} from '../../../../services/common/sub-category.service';
import {SubCategory} from '../../../../interfaces/common/sub-category.interface';
import {MatSelectChange} from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog';
// import {AllImagesDialogComponent} from '../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../interfaces/gallery/gallery.interface';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {VariationService} from '../../../../services/common/variation.service';
import {Variation} from '../../../../interfaces/common/variation.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  // Form Array
  specificationDataArray?: FormArray;
  variationsDataArray?: FormArray;

  // Store Data
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  brands: Brand[] = [];
  tags: Tag[] = [];
  variations: Variation[] = [];
  id?: string;
  product?: Product;

  // Image
  chooseImage?: string[] = [];

  // Image Placeholder
  variationImagePlaceholder = VARIATION_IMG_PLACEHOLDER;


  // Static Data
  productStatus: Select[] = PRODUCT_STATUS;
  emiMonths: Select[] = EMI_MONTHS;
  discountTypes: Select[] = DISCOUNT_TYPES;
  amountTypes: Select[] = AMOUNT_TYPES;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  private subDataSix: Subscription;
  private subDataSeven: Subscription;
  private subDataEight: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private productService: ProductService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
    private tagService: TagService,
    private variationService: VariationService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {

    // Init Data Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');

      if (this.id) {
        this.getProductById();
      }
    });

    // Base Data
    this.getAllCategories();
    this.getAllBrands();
    this.getAllTags();
    this.getAllVariations();
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onAddNewSpecifications()
   * removeFormArrayField()
   * clearFormArray()
   * onSubmit()
   */
   private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      costPrice: [null, Validators.required],
      salePrice: [null, Validators.required],
      hasTax: [null],
      tax: [null],
      sku: [null],
      emiMonth: [null],
      discountType: [null],
      discountAmount: [null],
      images: [null],
      quantity: [null],
      trackQuantity: [null],
      seoTitle: [null],
      seoDescription: [null],
      seoKeywords: [null],
      category: [null, Validators.required],
      subCategory: [null],
      brand: [null, Validators.required],
      tags: [null],
      earnPoint: [null],
      pointType: [null],
      pointValue: [null],
      redeemPoint: [null],
      redeemType: [null],
      redeemValue: [null],
      status: [this.productStatus[1].value, Validators.required],
      videoUrl: [null],
      unit: [null],
      specifications: this.fb.array([]),
      // Variations
      hasVariations: [null],
      variations: [null],
      variationsOptions: this.fb.array([]),
    });
    this.specificationDataArray = this.dataForm.get('specifications') as FormArray;
    this.variationsDataArray = this.dataForm.get('variationsOptions') as FormArray;

  }
  private setFormValue() {
    this.dataForm.patchValue({
        ...this.product,
        ...{
          category: this.product.category._id,
          brand: this.product.brand._id,
        }
      }
    );

    if (this.product.subCategory) {
      this.dataForm.patchValue({
        subCategory: this.product.subCategory._id,
      })
    }

    // Tags
    if (this.product.tags && this.product.tags.length) {
      this.dataForm.patchValue({
        tags: this.product.tags.map(m => m._id)
      })
    }

    // Variations
    if (this.product.specifications && this.product.specifications.length) {
      this.product.specifications.map(m => {
        const f = this.fb.group({
          name: [m.name, Validators.required],
          value: [m.value, Validators.required],
        });
        (this.dataForm?.get('specifications') as FormArray).push(f);
      });
    }

    if (this.product.hasVariations) {
      this.dataForm.patchValue({
        variations: this.product.variations.map(m => m._id)
      });

      this.product.variationsOptions.map(m => {
        const f = this.fb.group({
          price: [m.price, Validators.required],
          quantity: [m.quantity, Validators.required],
          image: [m.image],
          variations: [m.variations]
        });
        (this.dataForm?.get('variationsOptions') as FormArray).push(f);
      });
    }

    // Set Image
    if (this.product.images && this.product.images.length) {
      this.chooseImage = this.product.images;
    }
    // Get Sub Category By Category
    if (this.product.subCategory) {
      this.getSubCategoriesByCategoryId(this.product.category._id);
    }
  }

  onAddNewSpecifications() {
    const f = this.fb.group({
      name: [null, Validators.required],
      value: [null, Validators.required]
    });
    (this.dataForm?.get('specifications') as FormArray).push(f);
  }

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'specifications': {
        formDataArray = this.specificationDataArray;
        break;
      }
      case 'variationsOptions': {
        formDataArray = this.variationsDataArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  onSubmit() {
    console.log('***', this.dataForm.value)
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    // console.log('this.dataForm', this.dataForm.value);
    const mData = {
      ...this.dataForm.value,
      ...{
        category: {
          _id: this.dataForm.value.category,
          name: this.categories.find(f => f._id === this.dataForm.value.category).name,
          slug: this.categories.find(f => f._id === this.dataForm.value.category).slug,
        },
        brand: {
          _id: this.dataForm.value.brand,
          name: this.brands.find(f => f._id === this.dataForm.value.brand).name,
          slug: this.brands.find(f => f._id === this.dataForm.value.brand).slug,
        },
      }
    }

    if (this.dataForm.value.subCategory) {
      mData.subCategory = {
        _id: this.dataForm.value.subCategory,
        name: this.subCategories.find(f => f._id === this.dataForm.value.subCategory).name,
        slug: this.subCategories.find(f => f._id === this.dataForm.value.subCategory).slug,
      }
    }

    if (this.dataForm.value.hasVariations) {
      const filteredVariations = this.variations.filter((el) => {
        return this.dataForm.value.variations.some((f) => {
          return f === el._id;
        });
      });

      mData.variations = filteredVariations;
    }

    if (this.product) {
      this.updateProductById(mData);
    } else {
      this.addProduct(mData);

    }

  }


  /**
   * HTTP REQ HANDLE
   * getAllCategories
   * getAllBrands
   * getAllTags
   * getAllVariations()
   * getSubCategoriesByCategoryId()
   * getProductById()
   * addProduct()
   * updateProductById()
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


    this.subDataFour = this.categoryService.getAllCategories(filterData, null)
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


    this.subDataFive = this.brandService.getAllBrands(filterData, null)
      .subscribe(res => {
        this.brands = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getAllTags() {
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


    this.subDataSix = this.tagService.getAllTags(filterData, null)
      .subscribe(res => {
        this.tags = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getAllVariations() {

    // Select
    const mSelect = {
      name: 1,
      values: 1,
    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      sort: {name: 1}
    }

    this.subDataEight = this.variationService.getAllVariations(filterData, null)
      .subscribe(res => {
        this.variations = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getSubCategoriesByCategoryId(categoryId: string) {
    const select = 'name category slug'
    this.subDataSeven = this.subCategoryService.getSubCategoriesByCategoryId(categoryId, select)
      .subscribe(res => {
        this.subCategories = res.data;
      }, error => {
        console.log(error);
      });
  }

  private getProductById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.productService.getProductById(this.id)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.product = res.data;
          this.setFormValue();
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private addProduct(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.productService.addProduct(data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.formElement.resetForm();
          this.clearFormArray(this.variationsDataArray);
          this.chooseImage = [];
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  private updateProductById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.productService.updateProductById(this.product._id, data)
      .subscribe(res => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
        } else {
          this.uiService.warn(res.message);
        }
      }, error => {
        this.spinnerService.hide();
        console.log(error);
      });
  }

  /**
   * DUG & DROP IMAGE REARRANGE
   */

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chooseImage, event.previousIndex, event.currentIndex);
  }

  /**
   * REMOVE SELECTED IMAGE
   */
  removeSelectImage(s: string) {
    const index = this.chooseImage.findIndex(x => x === s);
    this.chooseImage.splice(index, 1);
  }


  /**
   * ON CATEGORY SELECT
   */
  onCategorySelect(event: MatSelectChange) {
    if (event.value) {
      this.getSubCategoriesByCategoryId(event.value);
    }
  }


  /**
   * GET IMAGE DATA FROM STATE
   */
  private patchPickedImagesUnique(images: Gallery[]) {
    if (this.chooseImage && this.chooseImage.length > 0) {
      const nImages = images.map(m => m.url);
      this.chooseImage = this.utilsService.mergeArrayString(nImages, this.chooseImage);
    } else {
      this.chooseImage = images.map(m => m.url);
    }
    this.dataForm.patchValue(
      {images: this.chooseImage}
    );
  }

  /**
   * VARIATIONS LOGICS
   * onAddNewVariationObject()
   * createVariationsOptions()
   * removeVariationImage()
   * onCheckEnableVariations()
   */

  onAddNewVariationObject(formControl: string) {

    // Reset Form Array
    if (this.variationsDataArray.controls.length) {
      this.clearFormArray(this.variationsDataArray)
    }

    // Filtered from Array with Array of string[]
    const filteredVariations = this.variations.filter((el) => {
      return this.dataForm.value.variations.some((f) => {
        return f === el._id;
      });
    });

    const variationsOptions = this.createVariationsOptions(filteredVariations);
    const result = variationsOptions.map(m => {
      const f = this.fb.group({
        price: [null, Validators.required],
        quantity: [null, Validators.required],
        image: [null],
        variations: [m.variations]
      });
      (this.dataForm?.get(formControl) as FormArray).push(f);
    })
  }

  createVariationsOptions(variations: Variation[]) {
    let output = [];
    let variation = [];
    let finalData = [];
    let valueArr = [];

    for (let i = 0; i < variations.length; i++) {
      let values = Object.values(variations[i].values)

      valueArr.push(values)
    }

    function detectCombinations(input, output, position, path) {
      if (position == null) {
        position = 0;
      }
      if (path == null) {
        path = [];
      }
      if (position < input.length) {
        let item = input[position];
        for (let i = 0; i < item.length; ++i) {
          const value = item[i];
          path.push(value);
          detectCombinations(input, output, position + 1, path);
          path.pop();
        }
      } else {
        output.push(path.slice());
      }
    }

    detectCombinations(valueArr, output, null, null)

    for (let i = 0; i < output.length; i++) {
      for (let j = 0; j < variations.length; j++) {
        let obj = {
          _id: variations[j]._id,
          name: variations[j].name,
          value: output[i][j]
        }
        variation.push(obj);
      }
      let obj1 = {
        // price: 0,
        // quantity: 0,
        variations: variation
      }
      finalData.push(obj1)
      variation = [];
    }

    return finalData;
  }

  removeVariationImage(i: number) {
    this.variationsDataArray.at(i).patchValue({image: null})
  }

  onCheckEnableVariations(event: MatCheckboxChange) {
    if(!event.checked) {
      // Reset Form Array
      if (this.variationsDataArray.controls.length) {
        this.clearFormArray(this.variationsDataArray)
      }
      this.dataForm.get('variations').clearValidators();
      this.dataForm.get('variations').updateValueAndValidity();
      this.dataForm.value.variations = null;
    }
  }

    /**
   * OPEN COMPONENT DIALOG
   */

    //  public openGalleryDialog() {
    //   const dialogRef = this.dialog.open(AllImagesDialogComponent, {
    //     data: {type: 'multiple', count: this.chooseImage.length ? (5 - this.chooseImage.length) : 5},
    //     panelClass: ['theme-dialog', 'full-screen-modal-lg'],
    //     width: '100%',
    //     minHeight: '100%',
    //     autoFocus: false,
    //     disableClose: true
    //   });
    //   dialogRef.afterClosed().subscribe(dialogResult => {
    //     if (dialogResult) {
    //       if (dialogResult.data && dialogResult.data.length > 0) {
    //         this.patchPickedImagesUnique(dialogResult.data);
    //       }
    //     }
    //   });
    // }

    // public openVariationGalleryDialog(index: number) {
    //   const dialogRef = this.dialog.open(AllImagesDialogComponent, {
    //     data: {type: 'multiple', count: 1},
    //     panelClass: ['theme-dialog', 'full-screen-modal-lg'],
    //     width: '100%',
    //     minHeight: '100%',
    //     autoFocus: false,
    //     disableClose: true
    //   });
    //   dialogRef.afterClosed().subscribe(dialogResult => {
    //     if (dialogResult) {
    //       if (dialogResult.data && dialogResult.data.length > 0) {
    //         this.variationsDataArray.at(index).patchValue({image: dialogResult.data[0].url})
    //       }
    //     }
    //   });
    // }

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
  }

}
