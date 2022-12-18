import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../../../services/admin/admin.service';
import {UiService} from '../../../../../services/core/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {BrandService} from '../../../../../services/common/brand.service';
import {UtilsService} from '../../../../../services/core/utils.service';
import {Brand} from '../../../../../interfaces/common/brand.interface';
import {AllImagesDialogComponent} from '../../../gallery/image/all-images-dialog/all-images-dialog.component';
import {Gallery} from '../../../../../interfaces/gallery/gallery.interface';
import {MatDialog} from '@angular/material/dialog';
import {defaultUploadImage} from '../../../../../core/utils/app-data';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  // Store Data
  id?: string;
  brand?: Brand;

  // Image Picker
  pickedImage = defaultUploadImage;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private brandService: BrandService,
    private uiService: UiService,
    private spinnerService: NgxSpinnerService,
    private utilsService: UtilsService,
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
        this.getBrandById();
      }
    });
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
      description: [null],
    });
  }
  private setFormValue() {
    if (this.brand && this.brand.image) {
      this.pickedImage = this.brand.image;
    }
    this.dataForm.patchValue({...this.brand});
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please filed all the required field');
      return;
    }

    if (this.brand) {
      this.updateBrandById();
    } else {
      this.addBrand();

    }

  }



  /**
   * HTTP REQ HANDLE
   * getBrandById
   * addBrand
   * updateBrandById
   */
  private getBrandById() {
    this.spinnerService.show();
    // const select = 'name email username phoneNo gender role permissions hasAccess'
    this.subDataTwo = this.brandService.getBrandById(this.id)
      .subscribe({
        next: (res => {
          this.spinnerService.hide();
          if (res.success) {
            this.brand = res.data;
            this.setFormValue();
          }
        }),
        error: (error => {
          this.spinnerService.hide();
          console.log(error);
        })
      });
  }

  private addBrand() {
    this.spinnerService.show();
    this.subDataOne = this.brandService.addBrand(this.dataForm.value)
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

  private updateBrandById() {
    this.spinnerService.show();
    this.subDataThree = this.brandService.updateBrandById(this.brand._id, this.dataForm.value)
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

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(AllImagesDialogComponent, {
      data: {type: 'single', count: 1},
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          this.dataForm.patchValue({image: image.url});
          this.pickedImage = image.url;
        }
      }
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
    }

}
