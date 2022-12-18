import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {SubCategoryService} from '../../../../../services/common/sub-category.service';
import {SubCategory} from '../../../../../interfaces/common/sub-category.interface';
import {Category} from '../../../../../interfaces/common/category.interface';
import {CategoryService} from '../../../../../services/common/category.service';
import {FilterData} from '../../../../../interfaces/core/filter-data';
import {defaultUploadImage} from '../../../../../core/utils/app-data';
// import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {


  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  subCategory?: SubCategory;
  categories: Category[] = [];

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
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
        this.getSubCategoryById();
      }
    });

    // Base Data
    this.getAllCategories();
  }

  /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
   private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      image: [null],
      priority: [null],
      category: [null, Validators.required],
    });
  }
  private setFormValue() {
    if (this.subCategory && this.subCategory.image) {
      this.pickedImage = this.subCategory.image;
    }
    this.dataForm.patchValue({...this.subCategory});
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.subCategory) {
      this.updateSubCategoryById();
    } else {
      this.addSubCategory();

    }

  }


   /**
   * HTTP REQ HANDLE
   * getAllCategories
   * getSubCategoryById
   * addSubCategory
   * updateSubCategoryById
   */
    private getAllCategories() {
      this.spinnerService.show();
      // Select
      const mSelect = {
        name: 1,
      }

      const filterData: FilterData = {
        pagination: null,
        filter: null,
        select: mSelect,
        sort: {name: 1}
      }
      this.subDataFour = this.categoryService.getAllCategories(filterData, null)
        .subscribe({
          next: (res => {
            this.spinnerService.hide();
            this.categories = res.data;
          }),
          error: (error => {
            this.spinnerService.hide();
            console.log(error);
          })
        });
    }

    private getSubCategoryById() {
      this.spinnerService.show();
      // const select = 'name email username phoneNo gender role permissions hasAccess'
      this.subDataTwo = this.subCategoryService.getSubCategoryById(this.id)
        .subscribe({
          next: (res => {
            this.spinnerService.hide();
            if (res.success) {
              this.subCategory = res.data;
              this.setFormValue();
            }
          }),
          error: (error => {
            this.spinnerService.hide();
            console.log(error);
          })
        });
    }
    private addSubCategory() {
      this.spinnerService.show();

      this.subDataOne = this.subCategoryService.addSubCategory(this.dataForm.value)
        .subscribe({
          next: (res => {
            this.spinnerService.hide();
            if (res.success) {
              this.uiService.success(res.message);
              this.formElement.resetForm();
              this.pickedImage = defaultUploadImage;
            } else {
              this.uiService.warn(res.message);
            }
          }),
          error: (error => {
            this.spinnerService.hide();
            console.log(error);
          })
        });
    }
    private updateSubCategoryById() {
      this.spinnerService.show();
      this.subDataThree = this.subCategoryService.updateSubCategoryById(this.subCategory._id, this.dataForm.value)
        .subscribe({
          next: (res => {
            this.spinnerService.hide();
            if (res.success) {
              this.uiService.success(res.message);
            } else {
              this.uiService.warn(res.message);
            }
          }),
          error: (error => {
            this.spinnerService.hide();
            console.log(error);
          })
        });
    }



  /**
   * COMPONENT DIALOG
   * openGalleryDialog
   */

  // public openGalleryDialog() {
  //   const dialogRef = this.dialog.open(AllImagesDialogComponent, {
  //     data: {type: 'single', count: 1},
  //     panelClass: ['theme-dialog', 'full-screen-modal-lg'],
  //     width: '100%',
  //     minHeight: '100%',
  //     autoFocus: false,
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult) {
  //       if (dialogResult.data && dialogResult.data.length > 0) {
  //         const image: Gallery = dialogResult.data[0] as Gallery;
  //         this.dataForm.patchValue({image: image.url});
  //         this.pickedImage = image.url;
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
  }

}
